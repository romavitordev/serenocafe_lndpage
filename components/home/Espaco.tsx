'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Reveal } from '@/components/ui/Reveal'
import { historia, imagens } from '@/lib/site'

const fotos = [...imagens.espaco, ...imagens.visite]
// Render duplicado pro loop infinito (wrap modular por 1 set).
const loopFotos = [...fotos, ...fotos]
const DERIVA = -0.5 // deriva contínua (carrossel), px/frame

/**
 * "O espaço" — galeria arrastável INFINITA. Deriva sozinha como um
 * carrossel; ao arrastar, ganha inércia e a faixa "estica" (skew por
 * velocidade). Quando um conjunto sai, o próximo é o mesmo — loop sem fim.
 * Em reduced-motion, vira um scroll horizontal nativo e estático.
 */
export function Espaco() {
  const faixa = useRef<HTMLDivElement>(null)
  const [reduz, setReduz] = useState(false)
  const [arrastando, setArrastando] = useState(false)

  const pos = useRef(0)
  const vel = useRef(0) // velocidade extra de arrasto/inércia (alimenta o skew)
  const setW = useRef(0) // largura exata de UM conjunto
  const ultimoX = useRef(0)
  const raf = useRef(0)
  const arrastandoRef = useRef(false)
  const secao = useRef<HTMLElement>(null)

  const medir = useCallback(() => {
    const f = faixa.current
    if (!f || f.children.length < fotos.length + 1) return
    const a = (f.children[0] as HTMLElement).offsetLeft
    const b = (f.children[fotos.length] as HTMLElement).offsetLeft
    setW.current = b - a
  }, [])

  const aplica = useCallback(() => {
    const f = faixa.current
    if (!f) return
    const skew = Math.max(-7, Math.min(7, vel.current * 0.35))
    const escalaY = 1 - Math.min(0.06, Math.abs(vel.current) * 0.0016)
    f.style.transform = `translate3d(${pos.current}px,0,0)`
    f.querySelectorAll<HTMLElement>('[data-card]').forEach((c) => {
      c.style.transform = `skewX(${skew}deg) scaleY(${escalaY})`
    })
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduz(true)
      return
    }
    medir()
    window.addEventListener('resize', medir)

    let rodando = false
    const loop = () => {
      if (!rodando) return
      if (!arrastandoRef.current) {
        pos.current += vel.current + DERIVA
        vel.current *= 0.92
        if (Math.abs(vel.current) < 0.03) vel.current = 0
      }
      const w = setW.current
      if (w > 0) {
        if (pos.current <= -w) pos.current += w
        else if (pos.current > 0) pos.current -= w
      }
      aplica()
      raf.current = requestAnimationFrame(loop)
    }
    const start = () => {
      if (rodando) return
      rodando = true
      raf.current = requestAnimationFrame(loop)
    }
    const stop = () => {
      rodando = false
      cancelAnimationFrame(raf.current)
    }

    // Só anima enquanto a seção está na tela — poupa CPU/bateria.
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 })
    if (secao.current) io.observe(secao.current)

    return () => {
      stop()
      io.disconnect()
      window.removeEventListener('resize', medir)
    }
  }, [aplica, medir])

  const onDown = (e: React.PointerEvent) => {
    if (reduz) return
    arrastandoRef.current = true
    setArrastando(true)
    ultimoX.current = e.clientX
    vel.current = 0
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }
  const onMove = (e: React.PointerEvent) => {
    if (!arrastandoRef.current) return
    const dx = e.clientX - ultimoX.current
    ultimoX.current = e.clientX
    pos.current += dx
    vel.current = dx
  }
  const onUp = () => {
    arrastandoRef.current = false
    setArrastando(false)
  }
  const onKey = (e: React.KeyboardEvent) => {
    if (reduz) return
    const passo = setW.current / fotos.length || 280
    if (e.key === 'ArrowLeft') {
      pos.current += passo
      vel.current = 14
    } else if (e.key === 'ArrowRight') {
      pos.current -= passo
      vel.current = -14
    }
  }

  if (reduz) {
    return (
      <section className="bg-creme py-28 md:py-40">
        <div className="container-page">
          <Cabecalho />
          <div className="mt-12 flex gap-5 overflow-x-auto pb-4">
            {fotos.map((foto, i) => (
              <div key={i} className="relative aspect-[4/5] w-72 shrink-0 overflow-hidden rounded-2xl">
                <Image src={foto.src} alt={foto.alt} fill sizes="18rem" className="object-cover" />
              </div>
            ))}
          </div>
          <Rodape />
        </div>
      </section>
    )
  }

  return (
    <section ref={secao} className="overflow-hidden bg-creme py-28 md:py-40">
      <div className="container-page">
        <Cabecalho />
      </div>

      <div
        role="group"
        tabIndex={0}
        aria-label="Galeria do espaço — use as setas para navegar"
        onKeyDown={onKey}
        className="mt-14 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-terracota focus-visible:ring-offset-4 focus-visible:ring-offset-creme"
        style={{ cursor: arrastando ? 'grabbing' : 'grab' }}
        data-cursor="arraste"
      >
        <div
          ref={faixa}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="flex w-max gap-6 px-3 will-change-transform select-none"
          style={{ touchAction: 'pan-y' }}
        >
          {loopFotos.map((foto, i) => {
            const n = (i % fotos.length) + 1
            return (
              <figure key={i} aria-hidden={i >= fotos.length} className="group relative shrink-0" style={{ width: 'clamp(16rem, 32vw, 26rem)' }}>
                <div data-card className="relative aspect-[4/5] overflow-hidden rounded-2xl will-change-transform">
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    draggable={false}
                    sizes="(max-width: 768px) 70vw, 32vw"
                    className="pointer-events-none object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 to-transparent opacity-60" />
                </div>
                <figcaption className="absolute bottom-4 left-4 right-4 label-mono text-creme">
                  {String(n).padStart(2, '0')} — {foto.alt.split(',')[0]}
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>

      <Rodape />
    </section>
  )
}

function Cabecalho() {
  return (
    <Reveal>
      <p className="kicker">03 — O espaço</p>
      <h2 className="mt-6 max-w-2xl text-balance font-serif text-4xl leading-[1.08] tracking-tight md:text-6xl">
        Um refúgio no centro.
      </h2>
      <p className="mt-6 max-w-xl text-base leading-8 text-espresso/65">{historia.espaco}</p>
    </Reveal>
  )
}

function Rodape() {
  return (
    <div className="container-page mt-14 flex flex-wrap items-center justify-between gap-4">
      <span className="label-mono text-espresso/40">arraste — o espaço não acaba</span>
      <Link href="/visite" className="btn-ghost-dark">
        Conheça o casarão
      </Link>
    </div>
  )
}

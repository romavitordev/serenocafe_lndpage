'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Reveal } from '@/components/ui/Reveal'
import { historia, imagens } from '@/lib/site'

const fotos = [...imagens.espaco, ...imagens.visite]

/**
 * "O espaço" — galeria arrastável com inércia e skew por velocidade
 * (a faixa "estica" conforme você arrasta rápido). Interação-assinatura:
 * tátil, fluida, feita pra dar vontade de arrastar de novo.
 * Em reduced-motion, vira um scroll horizontal nativo e estático.
 */
export function Espaco() {
  const faixa = useRef<HTMLDivElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const [reduz, setReduz] = useState(false)
  const [arrastando, setArrastando] = useState(false)

  // estado da física (em refs pra não re-renderizar a cada frame)
  const pos = useRef(0)
  const alvo = useRef(0)
  const vel = useRef(0)
  const ultimoX = useRef(0)
  const raf = useRef(0)
  const limite = useRef(0)

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

  const medirLimite = useCallback(() => {
    const f = faixa.current
    const v = viewport.current
    if (!f || !v) return
    limite.current = Math.min(0, v.clientWidth - f.scrollWidth)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduz(true)
      return
    }
    medirLimite()
    window.addEventListener('resize', medirLimite)

    const loop = () => {
      if (!arrastandoRef.current) {
        // inércia
        alvo.current += vel.current
        vel.current *= 0.92
        if (Math.abs(vel.current) < 0.05) vel.current = 0
      }
      alvo.current = Math.max(limite.current, Math.min(0, alvo.current))
      pos.current += (alvo.current - pos.current) * 0.12
      aplica()
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', medirLimite)
    }
  }, [aplica, medirLimite])

  const arrastandoRef = useRef(false)

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
    alvo.current += dx
    vel.current = dx
  }
  const onUp = () => {
    arrastandoRef.current = false
    setArrastando(false)
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
    <section className="overflow-hidden bg-creme py-28 md:py-40">
      <div className="container-page">
        <Cabecalho />
      </div>

      <div
        ref={viewport}
        className="mt-14 overflow-hidden"
        style={{ cursor: arrastando ? 'grabbing' : 'grab' }}
        data-cursor="arraste"
      >
        <div
          ref={faixa}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="flex w-max gap-6 px-6 will-change-transform select-none md:px-10"
          style={{ touchAction: 'pan-y' }}
        >
          {fotos.map((foto, i) => (
            <figure key={i} className="group relative shrink-0" style={{ width: 'clamp(16rem, 32vw, 26rem)' }}>
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
                {String(i + 1).padStart(2, '0')} — {foto.alt.split(',')[0]}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="container-page">
        <Rodape />
      </div>
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
    <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
      <span className="label-mono text-espresso/40">arraste para explorar →</span>
      <Link href="/visite" className="btn-ghost-dark">
        Conheça o casarão
      </Link>
    </div>
  )
}

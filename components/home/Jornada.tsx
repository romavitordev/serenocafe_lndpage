'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { jornada } from '@/lib/site'

/**
 * "A jornada do grão" — seção pinada com scrub.
 * Trilho de 300vh; o palco fica sticky enquanto as três cenas
 * (fazenda → torra → xícara) se cruzam em fade + leve escala.
 * Com prefers-reduced-motion, vira três blocos estáticos empilhados.
 */
export function Jornada() {
  const reduzir = useReducedMotion()
  const trilho = useRef<HTMLElement>(null)
  const cenas = useRef<Array<HTMLDivElement | null>>([])
  const barra = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduzir) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const els = cenas.current.filter(Boolean) as HTMLDivElement[]
      if (els.length < 2) return

      gsap.set(els[0], { autoAlpha: 1, scale: 1 })
      els.slice(1).forEach((el) => gsap.set(el, { autoAlpha: 0, scale: 1.04 }))

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trilho.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      })

      els.forEach((el, i) => {
        if (i === 0) return
        const pos = i // cada transição ocupa 1 "unidade" da timeline
        // Sequencial (sai → entra, sem gap) pra nunca haver duas cenas legíveis juntas
        tl.to(els[i - 1], { autoAlpha: 0, scale: 0.98, duration: 0.22, ease: 'none' }, pos - 0.5)
        tl.to(el, { autoAlpha: 1, scale: 1, duration: 0.22, ease: 'none' }, pos - 0.28)
      })
      // Espaço morto no fim pra última cena respirar
      tl.to({}, { duration: 0.6 })

      if (barra.current) {
        gsap.fromTo(
          barra.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: trilho.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          }
        )
      }
    }, trilho)

    return () => ctx.revert()
  }, [reduzir])

  /* Versão estática (reduced motion): blocos empilhados, sem pin. */
  if (reduzir) {
    return (
      <section className="bg-espresso py-24 text-creme">
        <div className="container-page space-y-20">
          <p className="kicker-creme">A jornada do grão</p>
          {jornada.map((cena) => (
            <CenaEstatica key={cena.numero} cena={cena} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={trilho} className="relative h-[340vh] bg-espresso text-creme" aria-label="A jornada do grão">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* Barra de progresso vertical */}
        <div
          aria-hidden
          className="absolute left-6 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-creme/15 md:left-10 md:block"
        >
          <div ref={barra} className="h-full w-full origin-top bg-terracota" />
        </div>

        <div className="container-page relative h-full w-full">
          <p className="kicker-creme absolute left-6 top-24 z-10 hidden md:left-24 md:block">A jornada do grão</p>

          {jornada.map((cena, i) => (
            <div
              key={cena.numero}
              ref={(el) => {
                cenas.current[i] = el
              }}
              className="absolute inset-0 grid content-center gap-8 px-6 will-change-transform md:grid-cols-2 md:items-center md:gap-16 md:px-24"
            >
              <div className="relative order-2 aspect-[4/5] max-h-[44svh] w-full overflow-hidden rounded-2xl md:order-1 md:max-h-[60svh]">
                <Image
                  src={cena.imagem}
                  alt={cena.imagemAlt}
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-espresso/20" />
              </div>

              <div className="order-1 md:order-2">
                <p className="font-serif text-lg italic text-terracota">{cena.numero}</p>
                <h3 className="mt-3 font-serif text-4xl tracking-tight md:text-6xl">{cena.titulo}</h3>
                <p className="mt-5 max-w-md text-base leading-8 text-creme/70">{cena.texto}</p>
                <div className="mt-7 flex flex-wrap gap-2 text-creme/75">
                  {cena.notas.map((nota) => (
                    <span key={nota} className="chip border-creme/30">
                      {nota}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CenaEstatica({ cena }: { cena: (typeof jornada)[number] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-16">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
        <Image src={cena.imagem} alt={cena.imagemAlt} fill sizes="(max-width: 768px) 90vw, 45vw" className="object-cover" />
      </div>
      <div>
        <p className="font-serif text-lg italic text-terracota">{cena.numero}</p>
        <h3 className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">{cena.titulo}</h3>
        <p className="mt-5 max-w-md text-base leading-8 text-creme/70">{cena.texto}</p>
        <div className="mt-7 flex flex-wrap gap-2 text-creme/75">
          {cena.notas.map((nota) => (
            <span key={nota} className="chip border-creme/30">
              {nota}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

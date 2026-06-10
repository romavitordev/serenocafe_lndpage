'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Reveal } from '@/components/ui/Reveal'
import { historia, imagens } from '@/lib/site'

/**
 * Galeria do casarão com parallax sutil: cada foto viaja numa
 * velocidade diferente (data-speed) conforme o scroll passa.
 */
export function Espaco() {
  const reduzir = useReducedMotion()
  const raiz = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduzir) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
        const speed = Number(el.dataset.speed ?? 0)
        gsap.fromTo(
          el,
          { yPercent: speed * 6 },
          {
            yPercent: speed * -6,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        )
      })
    }, raiz)

    return () => ctx.revert()
  }, [reduzir])

  const fotos = imagens.espaco

  return (
    <section ref={raiz} className="overflow-hidden bg-creme py-28 md:py-40">
      <div className="container-page">
        <Reveal>
          <p className="kicker">O espaço</p>
          <h2 className="mt-6 max-w-2xl text-balance font-serif text-4xl leading-[1.08] tracking-tight md:text-6xl">
            Um refúgio <span className="italic text-terracota">no centro.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-espresso/65">{historia.espaco}</p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
          <div data-speed="1" className="col-span-2 md:col-span-7">
            <Foto foto={fotos[0]} aspecto="aspect-[16/10]" sizes="(max-width: 768px) 100vw, 58vw" />
          </div>
          <div data-speed="-1.4" className="md:col-span-5 md:mt-20">
            <Foto foto={fotos[1]} aspecto="aspect-[4/5]" sizes="(max-width: 768px) 50vw, 40vw" />
          </div>
          <div data-speed="-0.8" className="md:col-span-5 md:-mt-10">
            <Foto foto={fotos[3]} aspecto="aspect-[4/5]" sizes="(max-width: 768px) 50vw, 40vw" />
          </div>
          <div data-speed="1.2" className="col-span-2 md:col-span-7 md:mt-12">
            <Foto foto={fotos[2]} aspecto="aspect-[16/10]" sizes="(max-width: 768px) 100vw, 58vw" />
          </div>
        </div>

        <Reveal className="mt-16 text-center">
          <Link href="/visite" className="btn-ghost-dark">
            Conheça o casarão
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

function Foto({
  foto,
  aspecto,
  sizes,
}: {
  foto: { src: string; alt: string }
  aspecto: string
  sizes: string
}) {
  return (
    <div className={`group relative ${aspecto} overflow-hidden rounded-2xl`}>
      <Image
        src={foto.src}
        alt={foto.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-espresso/10 transition-opacity duration-700 group-hover:opacity-0" />
    </div>
  )
}

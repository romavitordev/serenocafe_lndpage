'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { brand, imagens } from '@/lib/site'

/**
 * Hero scrubbed por scroll.
 *
 * A seção tem 220vh de "trilho"; o palco fica sticky ocupando a tela.
 * Conforme o usuário rola, o GSAP scrubba: zoom lento na mídia, overlay
 * escurecendo, wordmark subindo e o hint de scroll sumindo.
 *
 * VÍDEO (opcional): coloque um vídeo all-intra em /public/media/hero.mp4
 * (instruções no README) e ele entra no lugar da imagem com o tempo
 * controlado pelo scroll — a água do coado desce conforme você rola.
 * Sem o arquivo, a imagem com Ken Burns assume. Nada quebra.
 */
const VIDEO_SRC = '/media/hero.mp4'

export function Hero() {
  const reduzir = useReducedMotion()
  const trilho = useRef<HTMLElement>(null)
  const midia = useRef<HTMLDivElement>(null)
  const overlay = useRef<HTMLDivElement>(null)
  const titulo = useRef<HTMLDivElement>(null)
  const hint = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [temVideo, setTemVideo] = useState(false)

  useEffect(() => {
    if (reduzir) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trilho.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      })

      tl.fromTo(midia.current, { scale: 1.02 }, { scale: 1.18, ease: 'none' }, 0)
        .fromTo(overlay.current, { opacity: 0.42 }, { opacity: 0.8, ease: 'none' }, 0)
        .fromTo(titulo.current, { yPercent: 0 }, { yPercent: -36, opacity: 0.25, ease: 'none' }, 0)
        .to(hint.current, { opacity: 0, ease: 'none' }, 0)

      // Scrub do vídeo: o tempo segue o progresso do scroll.
      ScrollTrigger.create({
        trigger: trilho.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const v = video.current
          if (!v || !v.duration || Number.isNaN(v.duration)) return
          v.currentTime = self.progress * v.duration
        },
      })
    }, trilho)

    return () => ctx.revert()
  }, [reduzir])

  // iOS exige um play()+pause() iniciado por gesto pra liberar o scrub.
  useEffect(() => {
    if (!temVideo) return
    const prime = () => {
      const v = video.current
      if (!v) return
      v.play()
        .then(() => v.pause())
        .catch(() => undefined)
      window.removeEventListener('touchstart', prime)
    }
    window.addEventListener('touchstart', prime, { once: true, passive: true })
    return () => window.removeEventListener('touchstart', prime)
  }, [temVideo])

  return (
    <section
      ref={trilho}
      className={reduzir ? 'relative h-[100svh]' : 'relative h-[220vh]'}
      aria-label="Apresentação do Sereno"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-espresso">
        {/* Mídia (imagem sempre; vídeo por cima quando disponível) */}
        <div ref={midia} className="absolute inset-0 will-change-transform">
          <Image
            src={imagens.hero.src}
            alt={imagens.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <video
            ref={video}
            muted
            playsInline
            preload="auto"
            aria-hidden
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              temVideo ? 'opacity-100' : 'opacity-0'
            }`}
            onLoadedData={() => setTemVideo(true)}
            onError={() => setTemVideo(false)}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </div>

        {/* Overlay que escurece com o scroll */}
        <div ref={overlay} className="absolute inset-0 bg-espresso/40" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-espresso/85 to-transparent" />

        {/* Conteúdo */}
        <div ref={titulo} className="relative flex h-full items-center justify-center">
          <div className="container-page text-center text-creme">
            <p className="kicker-creme">café &amp; torrefação</p>
            <h1 className="mx-auto mt-6 font-serif text-[clamp(4.5rem,16vw,11rem)] leading-[0.95] tracking-tight">
              {brand.nome}
            </h1>
            <p className="mx-auto mt-6 max-w-md text-balance font-serif text-xl italic text-creme/85 md:text-2xl">
              {brand.tagline}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/graos" className="btn-primary">
                Conheça os grãos
              </Link>
              <Link href="/visite" className="btn-ghost-light">
                Visite o café
              </Link>
            </div>
          </div>
        </div>

        {/* Hint de scroll */}
        <div
          ref={hint}
          aria-hidden
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-creme/60"
        >
          <span className="text-[0.62rem] uppercase tracking-[0.32em]">desça devagar</span>
          <span className="relative block h-10 w-px overflow-hidden bg-creme/20">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-descer bg-terracota" />
          </span>
        </div>
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { brand } from '@/lib/site'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const POSTER = `${BASE}/media/hero-poster.jpg`
const SRC_DESKTOP = `${BASE}/media/hero.mp4`
const SRC_MOBILE = `${BASE}/media/hero-mobile.mp4`

// Feather: dissolve as bordas brancas do vídeo no creme (vira "poça de luz").
const MASK = 'radial-gradient(66% 80% at 50% 60%, #000 38%, transparent 74%)'

type Modo = 'carregando' | 'video' | 'estatico'

export function HeroVideoScroll() {
  const trilho = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const wordmark = useRef<HTMLDivElement>(null)
  const conteudo = useRef<HTMLDivElement>(null)
  const hint = useRef<HTMLDivElement>(null)
  const vapor = useRef<HTMLDivElement>(null)
  const halo = useRef<HTMLDivElement>(null)

  const [modo, setModo] = useState<Modo>('carregando')
  const [src, setSrc] = useState<string>(SRC_DESKTOP)
  const [pronto, setPronto] = useState(false)

  useEffect(() => {
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number }
    const saveData = !!nav.connection?.saveData
    const lowMem = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4
    const mobile = window.matchMedia('(max-width: 768px)').matches

    if (reduz || saveData || (mobile && lowMem)) {
      setModo('estatico')
      return
    }
    setSrc(mobile ? SRC_MOBILE : SRC_DESKTOP)
    setModo('video')
  }, [])

  useEffect(() => {
    if (modo !== 'video') return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const v = video.current
      const tl = gsap.timeline({
        scrollTrigger: { trigger: trilho.current, start: 'top top', end: 'bottom bottom', scrub: 1.2 },
        onUpdate: () => {
          if (!v || !v.duration || Number.isNaN(v.duration)) return
          v.currentTime = tl.progress() * (v.duration - 0.04)
        },
      })
      tl.fromTo(wordmark.current, { yPercent: 0 }, { yPercent: -14, opacity: 0.6, ease: 'none' }, 0)
        .to(conteudo.current, { opacity: 0, y: -24, ease: 'none' }, 0)
        .to(hint.current, { opacity: 0, ease: 'none' }, 0)
        .fromTo(vapor.current, { yPercent: 10, opacity: 0.6 }, { yPercent: -40, opacity: 0, ease: 'none' }, 0)
        .fromTo(halo.current, { opacity: 0.8, scale: 1 }, { opacity: 1, scale: 1.14, ease: 'none' }, 0)
    }, trilho)

    return () => ctx.revert()
  }, [modo])

  useEffect(() => {
    if (modo !== 'video') return
    const prime = () => {
      const v = video.current
      v?.play().then(() => v.pause()).catch(() => undefined)
    }
    window.addEventListener('touchstart', prime, { once: true, passive: true })
    return () => window.removeEventListener('touchstart', prime)
  }, [modo])

  const estatico = modo === 'estatico'

  return (
    <section
      ref={trilho}
      aria-label="Sereno — o instante antes do dia começar"
      className={estatico ? 'relative h-[100svh]' : 'relative h-[260vh]'}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-creme">
        {/* Halo âmbar — atrás da xícara (centro no mobile, direita no desktop) */}
        <div
          ref={halo}
          aria-hidden
          className="halo-ambar left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-[72%]"
          style={{ width: 'min(86vw, 760px)', height: 'min(86vw, 760px)' }}
        />

        {/* Mídia: xícara + espiral — backdrop no mobile, metade direita no desktop */}
        <div className="absolute inset-y-0 left-0 right-0 z-10 flex items-end justify-center overflow-hidden md:left-[44%]">
          {estatico ? (
            <Image
              src={POSTER}
              alt="Uma xícara de café com uma espiral suspensa acima dela, como o tempo parado"
              width={1920}
              height={1080}
              priority
              className="h-[82svh] w-full max-w-full object-contain object-bottom md:h-[94svh]"
              style={{ WebkitMaskImage: MASK, maskImage: MASK }}
            />
          ) : (
            <>
              <Image
                src={POSTER}
                alt=""
                aria-hidden
                width={1920}
                height={1080}
                priority
                className={`absolute bottom-0 h-[82svh] w-full max-w-full object-contain object-bottom transition-opacity duration-500 md:h-[94svh] ${pronto ? 'opacity-0' : 'opacity-100'}`}
                style={{ WebkitMaskImage: MASK, maskImage: MASK }}
              />
              <video
                ref={video}
                muted
                playsInline
                preload="auto"
                aria-hidden
                width={1920}
                height={1080}
                className="h-[82svh] w-full max-w-full object-contain object-bottom md:h-[94svh]"
                style={{ WebkitMaskImage: MASK, maskImage: MASK }}
                onLoadedData={() => setPronto(true)}
              >
                <source src={src} type="video/mp4" />
              </video>
            </>
          )}
        </div>

        {/* Vapor sutil em parallax */}
        {!estatico && (
          <div ref={vapor} aria-hidden className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 md:left-[44%]">
            <div className="absolute left-1/2 top-[26%] h-64 w-40 -translate-x-1/2 rounded-full bg-creme/40 blur-3xl" />
            <div className="absolute left-[46%] top-[16%] h-44 w-24 -translate-x-1/2 rounded-full bg-white/30 blur-2xl" />
          </div>
        )}

        {/* Véu creme pra legibilidade do texto (mais forte no mobile) */}
        <div aria-hidden className="absolute inset-0 z-20 bg-gradient-to-b from-creme/80 via-creme/10 to-transparent md:bg-gradient-to-r md:from-creme md:via-creme/70 md:to-transparent" />

        {/* Texto — coluna esquerda, editorial */}
        <div className="absolute inset-0 z-30 flex items-center">
          <div className="container-wide">
            <div className="max-w-xl text-center md:text-left">
              <p className="kicker mb-5">café &amp; torrefação</p>
              <div ref={wordmark}>
                <h1
                  className="font-serif font-light leading-[0.9] tracking-tight text-espresso"
                  style={{ fontSize: 'clamp(3.6rem, 9vw, 8.5rem)' }}
                >
                  {brand.nome}
                </h1>
              </div>
              <div ref={conteudo}>
                <p className="mx-auto mt-6 max-w-md text-balance font-serif text-xl italic text-espresso/75 md:mx-0">
                  {brand.tagline}
                </p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
                  <Link href="/graos" className="btn-primary">Conheça os grãos</Link>
                  <Link href="/visite" className="btn-ghost-dark">Visite o café</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hint de scroll */}
        {!estatico && (
          <div ref={hint} aria-hidden className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2 text-espresso/40 md:left-10 md:translate-x-0 md:items-start">
            <span className="label-mono">role devagar</span>
            <span className="relative block h-9 w-px overflow-hidden bg-espresso/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-descer bg-terracota" />
            </span>
          </div>
        )}
      </div>
    </section>
  )
}

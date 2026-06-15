'use client'

import { useEffect, useRef, useState } from 'react'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const VOL_ALVO = 0.32

/**
 * Som ambiente opt-in (default OFF). Toggle discreto no canto inferior
 * esquerdo: liga um loop com fade in/out, ícone de onda animando quando
 * ativo, lembra a escolha (localStorage). Escondido em reduced-motion.
 */
export function AmbientSound() {
  const [esconder, setEsconder] = useState(true)
  const [ativo, setAtivo] = useState(false)
  const audio = useRef<HTMLAudioElement | null>(null)
  const fadeRaf = useRef(0)

  const pegaAudio = () => {
    if (!audio.current) {
      const a = new Audio(`${BASE}/audio/ambiente.mp3`)
      a.loop = true
      a.volume = 0
      audio.current = a
    }
    return audio.current
  }

  const fade = (para: number) => {
    cancelAnimationFrame(fadeRaf.current)
    const a = pegaAudio()
    const de = a.volume
    const inicio = performance.now()
    const tick = (n: number) => {
      const t = Math.min((n - inicio) / 800, 1)
      a.volume = de + (para - de) * t
      if (t < 1) fadeRaf.current = requestAnimationFrame(tick)
      else if (para === 0) a.pause()
    }
    fadeRaf.current = requestAnimationFrame(tick)
  }

  const ligar = async () => {
    try {
      await pegaAudio().play()
      fade(VOL_ALVO)
      setAtivo(true)
      localStorage.setItem('sereno_som', 'on')
    } catch {
      /* navegador bloqueou — ignora */
    }
  }
  const desligar = () => {
    fade(0)
    setAtivo(false)
    localStorage.setItem('sereno_som', 'off')
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setEsconder(false)
    if (localStorage.getItem('sereno_som') === 'on') {
      const resume = () => ligar()
      window.addEventListener('pointerdown', resume, { once: true })
      return () => window.removeEventListener('pointerdown', resume)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (esconder) return null

  return (
    <button
      type="button"
      onClick={() => (ativo ? desligar() : ligar())}
      aria-pressed={ativo}
      aria-label={ativo ? 'Desligar som ambiente' : 'Ligar som ambiente'}
      className="fixed bottom-5 left-5 z-[120] inline-flex items-center gap-2.5 rounded-full border border-espresso/15 bg-creme/80 px-4 py-2.5 text-espresso backdrop-blur-sm transition-colors hover:border-terracota"
    >
      <span className="flex h-4 items-end gap-[3px]" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-[2px] rounded-full bg-terracota ${ativo ? 'animate-onda' : ''}`}
            style={{ height: ativo ? '100%' : '35%', animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </span>
      <span className="label-mono text-espresso/60">{ativo ? 'som on' : 'som'}</span>
    </button>
  )
}

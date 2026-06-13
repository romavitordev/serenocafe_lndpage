'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Cursor custom (só desktop/ponteiro fino). Ponto que segue o mouse com
 * lerp; cresce e mostra um rótulo contextual sobre elementos interativos
 * (via [data-cursor]). Decorativo (aria-hidden) — o foco nativo continua.
 * Some em touch e reduced-motion.
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const [ativo, setAtivo] = useState(false)
  const [label, setLabel] = useState('')
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const fino = window.matchMedia('(pointer: fine)').matches
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fino || reduz) return
    setAtivo(true)
    document.documentElement.classList.add('cursor-custom')

    const alvo = { x: innerWidth / 2, y: innerHeight / 2 }
    const pos = { ...alvo }
    let raf = 0

    const move = (e: PointerEvent) => {
      alvo.x = e.clientX
      alvo.y = e.clientY
      const el = (e.target as HTMLElement)?.closest<HTMLElement>('a, button, [data-cursor]')
      if (el) {
        setHover(true)
        setLabel(el.dataset.cursor ?? '')
      } else {
        setHover(false)
        setLabel('')
      }
    }
    const render = () => {
      pos.x += (alvo.x - pos.x) * 0.18
      pos.y += (alvo.y - pos.y) * 0.18
      if (dot.current) dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      raf = requestAnimationFrame(render)
    }
    window.addEventListener('pointermove', move, { passive: true })
    raf = requestAnimationFrame(render)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('cursor-custom')
    }
  }, [])

  if (!ativo) return null

  return (
    <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[150] hidden md:block" style={{ willChange: 'transform' }}>
      <div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-terracota bg-terracota/10 text-[0.6rem] uppercase tracking-[0.2em] text-terracota backdrop-blur-sm transition-all duration-300 ease-out ${
          hover ? 'h-16 w-16' : 'h-3 w-3'
        }`}
      >
        <span className={`font-mono transition-opacity duration-200 ${hover && label ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
      </div>
    </div>
  )
}

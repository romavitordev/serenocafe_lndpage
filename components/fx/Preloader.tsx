'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Preloader de marca — só na 1ª visita da sessão.
 * Fundo espresso, wordmark "Sereno" + símbolo (pingo terracota) e um
 * contador mono 0→100; sai com cortina pra cima revelando a hero.
 * Pulado em reduced-motion ou em visitas seguintes (sessionStorage).
 */
export function Preloader() {
  const [tocando, setTocando] = useState(false)
  const [n, setN] = useState(0)

  useEffect(() => {
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduz || sessionStorage.getItem('sereno_intro')) return

    sessionStorage.setItem('sereno_intro', '1')
    setTocando(true)
    document.documentElement.classList.add('trava-scroll')

    const dur = 1300
    const inicio = performance.now()
    let raf = 0
    const tick = (agora: number) => {
      const p = Math.min((agora - inicio) / dur, 1)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setTocando(false), 280)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (!tocando) document.documentElement.classList.remove('trava-scroll')
  }, [tocando])

  return (
    <AnimatePresence>
      {tocando && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-espresso text-creme"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative font-serif text-6xl tracking-tight md:text-7xl"
          >
            Sereno
            <span className="absolute -right-3 top-2 h-2 w-2 rounded-full bg-terracota md:-right-4" />
          </motion.div>
          <div className="mt-6 h-px w-40 overflow-hidden bg-creme/15">
            <div className="h-full bg-terracota transition-[width] duration-100 ease-linear" style={{ width: `${n}%` }} />
          </div>
          <span className="mt-3 label-mono text-creme/50">{String(n).padStart(3, '0')}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

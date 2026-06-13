'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

/**
 * Cortina de transição entre rotas: um painel espresso com o símbolo do
 * Sereno sobe revelando a página. Entrada apenas (App Router), ~0.7s,
 * ease-cortina. Pulada no 1º load (o preloader cobre) e em reduced-motion.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const primeira = useRef(true)
  const [cobrir, setCobrir] = useState(false)

  useEffect(() => {
    if (primeira.current) {
      primeira.current = false
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setCobrir(true)
    const t = setTimeout(() => setCobrir(false), 760)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {cobrir && (
          <motion.div
            key="cortina"
            aria-hidden
            className="fixed inset-0 z-[140] flex items-center justify-center bg-espresso"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.span
              className="relative font-serif text-4xl text-creme"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              Sereno
              <span className="absolute -right-2.5 top-1.5 h-1.5 w-1.5 rounded-full bg-terracota" />
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  )
}

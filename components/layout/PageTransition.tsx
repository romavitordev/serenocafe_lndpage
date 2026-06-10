'use client'

import { MotionConfig, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

/**
 * Transição de entrada entre rotas: uma cortina creme desliza para cima
 * enquanto o conteúdo sobe suavemente. (App Router não segura a página na
 * saída, então animamos apenas a entrada — confiável e sem flicker.)
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <MotionConfig reducedMotion="user">
      <div key={pathname} className="relative">
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[90] bg-creme"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{ originY: 0 }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </MotionConfig>
  )
}

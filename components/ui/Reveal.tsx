'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

/** Fade + subida suave quando o elemento entra na viewport (uma vez). */
export function Reveal({ children, className, delay = 0, y = 28 }: Props) {
  const reduzir = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduzir ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

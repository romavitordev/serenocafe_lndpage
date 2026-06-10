'use client'

import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  text: string
  className?: string
  delay?: number
  stagger?: number
}

/**
 * Revela um texto palavra a palavra, cada uma subindo de trás de uma
 * máscara — o reveal "cinematográfico" dos manifestos.
 *
 * O observer (whileInView) fica no WRAPPER: as palavras nascem 115%
 * deslocadas atrás de um overflow-hidden e, clipadas, nunca teriam
 * interseção com a viewport — o observer nelas jamais dispararia.
 * O texto real fica em sr-only; a cópia animada é decorativa.
 */
export function SplitWords({ text, className, delay = 0, stagger = 0.055 }: Props) {
  const reduzir = useReducedMotion()
  const palavras = text.split(' ')

  const pai = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  const palavra = {
    hidden: { y: reduzir ? '0%' : '115%' },
    visible: {
      y: '0%',
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={pai}
      >
        {palavras.map((p, i) => (
          <span key={`${p}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span className="inline-block will-change-transform" variants={palavra}>
              {p}
            </motion.span>
            {i < palavras.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

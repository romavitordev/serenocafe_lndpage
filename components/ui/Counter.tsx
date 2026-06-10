'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

type Props = {
  valor: number
  sufixo?: string
  duracao?: number
  className?: string
}

/** Contador que sobe do zero quando entra na viewport. */
export function Counter({ valor, sufixo = '', duracao = 1.6, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduzir = useReducedMotion()
  const [atual, setAtual] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduzir) {
      setAtual(valor)
      return
    }

    let frame = 0
    const inicio = performance.now()
    const tick = (agora: number) => {
      const t = Math.min((agora - inicio) / (duracao * 1000), 1)
      const easeOut = 1 - Math.pow(1 - t, 3)
      setAtual(Math.round(easeOut * valor))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduzir, valor, duracao])

  return (
    <span ref={ref} className={className}>
      {atual}
      {sufixo}
    </span>
  )
}

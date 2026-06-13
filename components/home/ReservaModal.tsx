'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

import { reserva, waLink, waMensagens } from '@/lib/site'

const EVENTO = 'sereno:abrir-reserva'

/** Dispara a abertura do modal (header e seção usam isto). */
export function abrirReserva() {
  window.dispatchEvent(new Event(EVENTO))
}

export function ReservaModal() {
  const [aberto, setAberto] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const painel = useRef<HTMLDivElement>(null)
  const gatilho = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const abre = () => {
      gatilho.current = (document.activeElement as HTMLElement) ?? null
      setEnviado(false)
      setAberto(true)
    }
    window.addEventListener(EVENTO, abre)
    return () => window.removeEventListener(EVENTO, abre)
  }, [])

  useEffect(() => {
    if (!aberto) return
    document.documentElement.classList.add('trava-scroll')
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false)
      if (e.key === 'Tab') {
        const foco = painel.current?.querySelectorAll<HTMLElement>(
          'a[href], button, input, select, textarea'
        )
        if (!foco || foco.length === 0) return
        const lista = Array.from(foco).filter((el) => !el.hasAttribute('disabled'))
        const primeiro = lista[0]
        const ultimo = lista[lista.length - 1]
        if (e.shiftKey && document.activeElement === primeiro) {
          e.preventDefault()
          ultimo.focus()
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault()
          primeiro.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => painel.current?.querySelector<HTMLElement>('input,select')?.focus(), 60)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('trava-scroll')
      clearTimeout(t)
      gatilho.current?.focus?.()
    }
  }, [aberto])

  const enviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const url = waLink(
      waMensagens.reserva(
        String(f.get('nome') ?? ''),
        String(f.get('pessoas') ?? ''),
        String(f.get('data') ?? ''),
        String(f.get('horario') ?? ''),
        String(f.get('obs') ?? '')
      )
    )
    window.open(url, '_blank', 'noopener,noreferrer')
    setEnviado(true)
  }

  const hoje = new Date().toISOString().split('T')[0]

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          className="fixed inset-0 z-[180] flex items-end justify-center bg-espresso/70 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.target === e.currentTarget && setAberto(false)}
        >
          <motion.div
            ref={painel}
            role="dialog"
            aria-modal="true"
            aria-label="Reservar uma mesa"
            className="relative w-full max-w-lg rounded-t-2xl bg-creme p-7 text-espresso sm:rounded-2xl sm:p-9"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={() => setAberto(false)}
              aria-label="Fechar"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-espresso/15 text-espresso/60 transition hover:border-terracota hover:text-terracota"
            >
              <X size={16} />
            </button>

            {enviado ? (
              <div className="py-8 text-center">
                <p className="kicker">Reserva</p>
                <p className="mt-4 font-serif text-2xl italic text-espresso">{reserva.sucesso}</p>
                <button type="button" onClick={() => setAberto(false)} className="btn-ghost-dark mt-8">
                  Fechar
                </button>
              </div>
            ) : (
              <>
                <p className="kicker">Reserva</p>
                <h3 className="mt-3 font-serif text-3xl tracking-tight">{reserva.titulo}</h3>
                <p className="mt-2 text-sm leading-7 text-espresso/60">{reserva.texto}</p>

                <form onSubmit={enviar} className="mt-6 grid gap-4">
                  <label className="grid gap-1.5">
                    <span className="label-mono text-espresso/55">Nome</span>
                    <input name="nome" required autoComplete="name" className="campo" placeholder="Seu nome" />
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="grid gap-1.5">
                      <span className="label-mono text-espresso/55">Data</span>
                      <input name="data" type="date" required min={hoje} className="campo" />
                    </label>
                    <label className="grid gap-1.5">
                      <span className="label-mono text-espresso/55">Horário</span>
                      <select name="horario" required className="campo">
                        {reserva.horarios.map((h) => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="grid gap-1.5">
                    <span className="label-mono text-espresso/55">Pessoas</span>
                    <select name="pessoas" required className="campo">
                      {reserva.pessoas.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-1.5">
                    <span className="label-mono text-espresso/55">Observação (opcional)</span>
                    <input name="obs" className="campo" placeholder="Aniversário, mesa no jardim…" />
                  </label>
                  <button type="submit" className="btn-primary mt-2 w-full">
                    Confirmar pelo WhatsApp
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

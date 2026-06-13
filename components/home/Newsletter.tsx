'use client'

import { useState } from 'react'

import { Reveal } from '@/components/ui/Reveal'
import { newsletter } from '@/lib/site'

export function Newsletter() {
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'ok' | 'erro'>('idle')

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const email = new FormData(form).get('email')
    setEstado('enviando')

    // Modo demo enquanto o endpoint for placeholder.
    if (newsletter.formspree.includes('SEU_ENDPOINT')) {
      setTimeout(() => setEstado('ok'), 600)
      form.reset()
      return
    }
    try {
      const r = await fetch(newsletter.formspree, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!r.ok) throw new Error()
      setEstado('ok')
      form.reset()
    } catch {
      setEstado('erro')
    }
  }

  return (
    <section className="bg-creme pb-28 md:pb-36">
      <div className="container-page">
        <Reveal className="overflow-hidden rounded-3xl border border-espresso/10 bg-espresso px-7 py-14 text-creme md:px-16 md:py-20">
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="kicker-creme">Clube Sereno</p>
            <h2 className="mt-5 text-balance font-serif text-3xl leading-tight tracking-tight md:text-5xl">
              {newsletter.titulo}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-7 text-creme/65">{newsletter.sub}</p>

            {estado === 'ok' ? (
              <p className="mt-8 font-serif text-xl italic text-terracota">{newsletter.sucesso}</p>
            ) : (
              <form onSubmit={enviar} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="seu@email.com"
                  className="w-full rounded-full border border-creme/20 bg-transparent px-5 py-3.5 text-sm text-creme placeholder:text-creme/35 focus:border-terracota focus:outline-none focus:ring-1 focus:ring-terracota"
                />
                <button type="submit" disabled={estado === 'enviando'} className="btn-primary shrink-0 disabled:opacity-60">
                  {estado === 'enviando' ? 'Enviando…' : newsletter.botao}
                </button>
              </form>
            )}
            {estado === 'erro' && (
              <p className="mt-3 text-sm text-terracota">Algo falhou. Tente de novo em instantes.</p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

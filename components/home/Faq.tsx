'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'
import { faq } from '@/lib/site'

export function Faq() {
  const [aberto, setAberto] = useState<number | null>(0)

  return (
    <section className="bg-creme pb-28 md:pb-36">
      <div className="container-page grid gap-12 md:grid-cols-[0.8fr_1.4fr] md:gap-16">
        <Reveal>
          <p className="kicker">Perguntas</p>
          <h2 className="mt-5 font-serif text-3xl tracking-tight md:text-5xl">
            Antes de <span className="italic text-terracota">vir.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="divide-y divide-espresso/10 border-y border-espresso/10">
            {faq.map((item, i) => {
              const expandido = aberto === i
              return (
                <li key={item.q}>
                  <button
                    type="button"
                    onClick={() => setAberto(expandido ? null : i)}
                    aria-expanded={expandido}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-serif text-lg text-espresso md:text-xl">{item.q}</span>
                    <Plus
                      size={18}
                      className={`shrink-0 text-terracota transition-transform duration-300 ${expandido ? 'rotate-45' : ''}`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${expandido ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <p className="overflow-hidden text-sm leading-7 text-espresso/65">{item.a}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

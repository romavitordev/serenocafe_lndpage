'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'
import { cardapio } from '@/lib/site'

/**
 * Cardápio com história: cada item abre num acordeão revelando o cuidado,
 * o preparo e o diferencial. Um item aberto por vez; acessível (aria-expanded).
 */
export function CardapioLista() {
  const [aberto, setAberto] = useState<string | null>(null)

  return (
    <div className="container-page space-y-20">
      {cardapio.map((categoria, ci) => (
        <Reveal key={categoria.categoria} delay={ci * 0.05}>
          <div className="grid gap-8 md:grid-cols-[0.9fr_2fr] md:gap-16">
            <div>
              <h2 className="font-serif text-3xl tracking-tight md:text-4xl">{categoria.categoria}</h2>
              {categoria.nota && (
                <p className="mt-3 max-w-xs text-sm leading-7 text-espresso/55">{categoria.nota}</p>
              )}
            </div>

            <ul className="divide-y divide-espresso/10 border-y border-espresso/10">
              {categoria.itens.map((item, ii) => {
                const chave = `${ci}-${ii}`
                const exp = aberto === chave
                return (
                  <li key={item.nome}>
                    <button
                      type="button"
                      onClick={() => setAberto(exp ? null : chave)}
                      aria-expanded={exp}
                      className="group flex w-full items-baseline gap-3 py-5 text-left"
                    >
                      <span className="min-w-0">
                        <span className="flex items-center gap-2">
                          <span className="font-serif text-xl tracking-tight transition-colors group-hover:text-terracota">
                            {item.nome}
                          </span>
                          {item.historia && (
                            <Plus
                              size={14}
                              aria-hidden
                              className={`shrink-0 text-terracota transition-transform duration-300 ${exp ? 'rotate-45' : ''}`}
                            />
                          )}
                        </span>
                        {item.descricao && (
                          <span className="mt-1 block text-sm leading-6 text-espresso/55">{item.descricao}</span>
                        )}
                      </span>
                      <span aria-hidden className="mx-1 flex-1 self-end border-b border-dotted border-espresso/25" />
                      <span className="shrink-0 font-mono text-base text-terracota">{item.preco}</span>
                    </button>

                    {item.historia && (
                      <div
                        className={`grid overflow-hidden transition-all duration-300 ease-out ${
                          exp ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <p className="min-h-0 max-w-xl overflow-hidden text-sm leading-7 text-espresso/70">
                          {item.historia}
                        </p>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

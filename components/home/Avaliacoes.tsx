'use client'

import { Star } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'
import { avaliacoes, avaliacaoResumo } from '@/lib/site'

function Estrelas({ nota }: { nota: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${nota} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < nota ? 'fill-terracota text-terracota' : 'text-espresso/20'}
        />
      ))}
    </div>
  )
}

export function Avaliacoes() {
  return (
    <section className="bg-creme py-24 md:py-32">
      <div className="container-wide">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker">Quem senta, volta</p>
            <h2 className="mt-5 max-w-xl text-balance font-serif text-4xl leading-[1.08] tracking-tight md:text-5xl">
              O que dizem de manhã.
            </h2>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-5xl font-medium text-espresso">{avaliacaoResumo.media}</span>
            <span className="label-mono text-espresso/50">
              ★ · {avaliacaoResumo.total} avaliações
            </span>
          </div>
        </Reveal>

        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {avaliacoes.map((a, i) => (
            <Reveal
              key={a.nome}
              delay={(i % 3) * 0.08}
              className="w-[80vw] shrink-0 snap-start sm:w-[20rem]"
            >
              <figure className="flex h-full flex-col rounded-2xl border border-espresso/10 bg-creme p-7">
                <Estrelas nota={a.nota} />
                <blockquote className="mt-4 flex-1 font-serif text-lg italic leading-8 text-espresso/85">
                  “{a.texto}”
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between">
                  <span className="font-serif text-base text-espresso">{a.nome}</span>
                  <span className="label-mono text-espresso/40">{a.quando}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

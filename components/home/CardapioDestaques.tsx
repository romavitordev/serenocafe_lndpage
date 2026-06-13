import Link from 'next/link'

import { Reveal } from '@/components/ui/Reveal'
import { destaquesCardapio } from '@/lib/site'

export function CardapioDestaques() {
  return (
    <section className="bg-creme pb-28 md:pb-40">
      <div className="container-page">
        <Reveal>
          <p className="kicker">Da casa</p>
          <h2 className="mt-6 max-w-2xl text-balance font-serif text-4xl leading-[1.08] tracking-tight md:text-6xl">
            Pra beber <span className="italic text-terracota">devagar.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destaquesCardapio.map((item, i) => (
            <Reveal key={item.nome} delay={i * 0.1}>
              <article className="group flex h-full flex-col justify-between rounded-2xl border border-espresso/10 bg-creme p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-terracota/40 hover:shadow-[0_24px_48px_-24px_rgba(32,21,14,0.25)]">
                <div>
                  <span className="chip border-avela/50 text-avela">{item.tag}</span>
                  <h3 className="mt-5 font-serif text-2xl tracking-tight">{item.nome}</h3>
                  <p className="mt-3 text-sm leading-7 text-espresso/60">{item.descricao}</p>
                </div>
                <p className="mt-6 font-mono text-lg text-terracota">{item.preco}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link href="/cardapio" className="btn-ghost-dark">
            Cardápio completo
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

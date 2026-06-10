import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Reveal } from '@/components/ui/Reveal'
import { cardapio, imagens, waLink, waMensagens } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Cardápio',
  description:
    'Métodos, bebidas com leite, autorais e comidas de forno — tudo servido sem pressa, com o grão da semana.',
}

export default function CardapioPage() {
  return (
    <>
      {/* Cabeçalho */}
      <section className="relative overflow-hidden bg-espresso pb-24 pt-40 text-creme md:pb-32 md:pt-52">
        <div className="absolute inset-0 opacity-20">
          <Image src={imagens.cardapioHero.src} alt="" aria-hidden fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/60 to-espresso" />
        <div className="container-page relative">
          <Reveal>
            <p className="kicker-creme">Cardápio</p>
            <h1 className="mt-6 max-w-2xl text-balance font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
              Pra beber <span className="italic text-terracota">devagar.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-creme/65">
              Todos os métodos saem com o grão da semana, torrado aqui nos
              fundos. A cozinha acompanha o ritmo: pouca coisa, bem feita.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Categorias */}
      <section className="bg-creme py-24 md:py-32">
        <div className="container-page space-y-20">
          {cardapio.map((categoria, ci) => (
            <Reveal key={categoria.categoria} delay={ci * 0.05}>
              <div className="grid gap-8 md:grid-cols-[0.9fr_2fr] md:gap-16">
                <div>
                  <h2 className="font-serif text-3xl tracking-tight md:text-4xl">
                    {categoria.categoria}
                  </h2>
                  {categoria.nota && (
                    <p className="mt-3 max-w-xs text-sm leading-7 text-espresso/55">
                      {categoria.nota}
                    </p>
                  )}
                </div>

                <ul className="divide-y divide-espresso/10">
                  {categoria.itens.map((item) => (
                    <li key={item.nome} className="group flex items-baseline gap-4 py-5">
                      <div className="min-w-0">
                        <h3 className="font-serif text-xl tracking-tight transition-colors group-hover:text-terracota">
                          {item.nome}
                        </h3>
                        {item.descricao && (
                          <p className="mt-1 text-sm leading-6 text-espresso/55">{item.descricao}</p>
                        )}
                      </div>
                      <span aria-hidden className="mx-1 flex-1 border-b border-dotted border-espresso/25" />
                      <span className="shrink-0 font-serif text-lg italic text-terracota">{item.preco}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          <Reveal className="border-t border-espresso/10 pt-12 text-center">
            <p className="mx-auto max-w-md text-sm leading-7 text-espresso/55">
              Servimos até 30 minutos antes de fechar. Os grãos da semana
              também vão pra casa — moídos na hora, se você preferir.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/visite" className="btn-primary">
                Visite o café
              </Link>
              <a
                href={waLink(waMensagens.geral)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-dark"
              >
                Perguntar no WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

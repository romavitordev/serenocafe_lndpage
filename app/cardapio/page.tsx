import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Reveal } from '@/components/ui/Reveal'
import { CardapioLista } from '@/components/cardapio/CardapioLista'
import { imagens, waLink, waMensagens } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Cardápio',
  description:
    'Métodos, bebidas com leite, autorais e comidas de forno — cada um com a história, o preparo e o cuidado da casa.',
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
              Pra beber devagar.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-creme/65">
              Todos os métodos saem com o grão da semana, torrado aqui nos
              fundos. A cozinha acompanha o ritmo: pouca coisa, bem feita.
            </p>
            <p className="mt-5 label-mono text-creme/45">toque em cada item pra conhecer o preparo</p>
          </Reveal>
        </div>
      </section>

      {/* Categorias com história */}
      <section className="bg-creme py-24 md:py-32">
        <CardapioLista />

        <Reveal className="container-page mt-20 border-t border-espresso/10 pt-12 text-center">
          <p className="mx-auto max-w-md text-sm leading-7 text-espresso/55">
            Servimos até 30 minutos antes de fechar. Os grãos da semana
            também vão pra casa — moídos na hora, se você preferir.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/visite" className="btn-primary">
              Visite o café
            </Link>
            <a href={waLink(waMensagens.geral)} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark">
              Perguntar no WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </>
  )
}

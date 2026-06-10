import type { Metadata } from 'next'
import Image from 'next/image'
import { Check } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'
import { assinatura, graos, historia, imagens, waLink, waMensagens } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Grãos & assinatura',
  description:
    'Micro-lotes brasileiros torrados toda semana: Cerrado, Catuaí Amarelo e Diamantina. Leve pra casa ou assine e receba todo mês.',
}

export default function GraosPage() {
  return (
    <>
      {/* Cabeçalho */}
      <section className="relative overflow-hidden bg-espresso pb-24 pt-40 text-creme md:pb-32 md:pt-52">
        <div className="absolute inset-0 opacity-20">
          <Image src={imagens.graosHero.src} alt="" aria-hidden fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/60 to-espresso" />
        <div className="container-page relative">
          <Reveal>
            <p className="kicker-creme">Torrefação</p>
            <h1 className="mt-6 max-w-2xl text-balance font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
              A calma vai <span className="italic text-terracota">pra sua casa.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-creme/65">{historia.curta}</p>
          </Reveal>
        </div>
      </section>

      {/* Micro-lotes */}
      <section className="bg-creme py-24 md:py-32">
        <div className="container-page space-y-24">
          {graos.map((grao, i) => (
            <Reveal key={grao.id}>
              <article
                className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                  i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={grao.imagem}
                    alt={grao.imagemAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.6s] ease-out hover:scale-[1.04]"
                  />
                </div>

                <div>
                  <p className="kicker">{grao.origem}</p>
                  <h2 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">{grao.nome}</h2>
                  <p className="mt-5 max-w-md text-base leading-8 text-espresso/65">{grao.descricao}</p>

                  <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-espresso/45">Processo</dt>
                      <dd className="mt-1 font-medium">{grao.processo}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-espresso/45">Altitude</dt>
                      <dd className="mt-1 font-medium">{grao.altitude}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-espresso/45">Torra</dt>
                      <dd className="mt-1 font-medium">{grao.torra}</dd>
                    </div>
                  </dl>

                  <div className="mt-7 flex flex-wrap gap-2 text-avela">
                    {grao.notas.map((nota) => (
                      <span key={nota} className="chip border-avela/50">
                        {nota}
                      </span>
                    ))}
                  </div>

                  <div className="mt-9 flex flex-wrap items-center gap-5">
                    <p className="font-serif text-2xl italic text-terracota">250g — {grao.preco}</p>
                    <a
                      href={waLink(waMensagens.grao(grao.nome, grao.preco))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Pedir pelo WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Assinatura */}
      <section id="assinatura" className="bg-espresso py-28 text-creme md:py-36">
        <div className="container-page">
          <Reveal className="text-center">
            <p className="kicker-creme">{assinatura.nome}</p>
            <h2 className="mx-auto mt-6 max-w-2xl text-balance font-serif text-4xl leading-[1.08] tracking-tight md:text-6xl">
              O café muda. <span className="italic text-terracota">A calma fica.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-creme/65">
              {assinatura.descricao}
            </p>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
            {assinatura.planos.map((plano, i) => (
              <Reveal key={plano.nome} delay={i * 0.12}>
                <div className="flex h-full flex-col rounded-2xl border border-creme/15 bg-noite p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-terracota/60">
                  <h3 className="font-serif text-2xl tracking-tight">{plano.nome}</h3>
                  <p className="mt-2 text-sm leading-7 text-creme/55">{plano.detalhe}</p>
                  <p className="mt-6 font-serif text-4xl italic text-terracota">
                    {plano.preco}
                    <span className="ml-1 font-sans text-xs not-italic text-creme/45">/mês</span>
                  </p>
                  <a
                    href={waLink(waMensagens.assinatura(plano.nome))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-8"
                  >
                    Assinar {plano.nome.split(' ')[0]}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-12 max-w-3xl">
            <ul className="grid gap-3 text-sm text-creme/70 sm:grid-cols-2">
              {assinatura.beneficios.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check size={16} className="mt-1 shrink-0 text-terracota" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}

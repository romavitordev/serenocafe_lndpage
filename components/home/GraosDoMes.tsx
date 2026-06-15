import Image from 'next/image'
import Link from 'next/link'

import { Reveal } from '@/components/ui/Reveal'
import { graos } from '@/lib/site'

export function GraosDoMes() {
  return (
    <section className="bg-espresso py-28 text-creme md:py-40">
      <div className="container-page">
        <Reveal>
          <p className="kicker-creme">05 — Torrefação própria</p>
          <h2 className="mt-6 max-w-2xl text-balance font-serif text-4xl leading-[1.08] tracking-tight md:text-6xl">
            Os grãos do mês.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-creme/65">
            Micro-lotes brasileiros, torrados toda semana nos fundos do casarão.
            Leve pra casa ou receba todo mês.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {graos.map((grao, i) => (
            <Reveal key={grao.id} delay={i * 0.12}>
              <Link
                href="/graos"
                className="group block h-full overflow-hidden rounded-2xl border border-creme/10 bg-noite transition-all duration-500 hover:-translate-y-1.5 hover:border-terracota/50"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={grao.imagem}
                    alt={grao.imagemAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <div className="p-7">
                  <p className="label-mono text-creme/50">{grao.origem}</p>
                  <h3 className="mt-2 font-serif text-3xl tracking-tight">{grao.nome}</h3>
                  <p className="mt-4 text-sm leading-7 text-creme/60">{grao.notas.join(' · ')}</p>
                  <p className="mt-5 flex items-baseline gap-2 font-mono text-base text-terracota">
                    <span className="text-creme/40">250g</span> {grao.preco}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link href="/graos" className="btn-primary">
            Ver grãos e assinatura
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

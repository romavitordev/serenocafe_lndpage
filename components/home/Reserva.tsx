'use client'

import { Reveal } from '@/components/ui/Reveal'
import { abrirReserva } from '@/components/home/ReservaModal'
import { delivery, reserva } from '@/lib/site'

export function Reserva() {
  return (
    <section className="relative overflow-hidden bg-noite py-28 text-creme md:py-36">
      <div className="halo-ambar left-1/2 top-0 -translate-x-1/2 -translate-y-1/3" style={{ width: 'min(80vw, 700px)', height: 'min(80vw, 700px)' }} aria-hidden />
      <div className="container-page relative grid gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="kicker-creme">Reserva</p>
          <h2 className="mt-5 max-w-md text-balance font-serif text-4xl leading-[1.06] tracking-tight md:text-6xl">
            Guarde uma mesa <span className="italic text-terracota">à sua espera.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-8 text-creme/65">{reserva.texto}</p>
          <button type="button" onClick={abrirReserva} data-cursor="reservar" className="btn-primary mt-8">
            Reservar mesa
          </button>
        </Reveal>

        <Reveal delay={0.15} className="md:justify-self-end">
          <div className="rounded-2xl border border-creme/12 bg-espresso/60 p-8 backdrop-blur-sm">
            <p className="label-mono text-creme/50">{delivery.titulo}</p>
            <div className="mt-5 flex flex-col gap-3">
              {delivery.itens.map((item) => (
                <a
                  key={item.nome}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-creme/15 px-5 py-4 text-sm transition-colors hover:border-terracota hover:text-terracota"
                >
                  {item.nome}
                  <span aria-hidden>→</span>
                </a>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-creme/55">{delivery.retirada}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

import { Clock, Instagram, MapPin } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'
import { brand, endereco, horarios } from '@/lib/site'

export function Visite() {
  return (
    <section className="bg-creme py-28 md:py-40">
      <div className="container-page grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <Reveal>
          <p className="kicker">07 — Visite</p>
          <h2 className="mt-6 text-balance font-serif text-4xl leading-[1.08] tracking-tight md:text-6xl">
            A porta abre às 7h.
          </h2>

          <div className="mt-10 space-y-6 text-sm leading-7 text-espresso/70">
            <div className="flex items-start gap-4">
              <MapPin size={18} className="mt-1 shrink-0 text-terracota" aria-hidden />
              <p>{endereco.linha}</p>
            </div>
            <div className="flex items-start gap-4">
              <Clock size={18} className="mt-1 shrink-0 text-terracota" aria-hidden />
              <div>
                {horarios.map((h) => (
                  <p key={h.dias}>
                    {h.dias} · {h.horas}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Instagram size={18} className="mt-1 shrink-0 text-terracota" aria-hidden />
              <p>{brand.instagram}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={endereco.mapsLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Como chegar
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="overflow-hidden rounded-2xl border border-espresso/10">
            <iframe
              src={endereco.mapsEmbed}
              title="Mapa — Sereno café & torrefação"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[380px] w-full border-0 grayscale-[35%] md:h-[460px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

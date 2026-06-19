import type { Metadata } from 'next'
import Image from 'next/image'
import { Clock, Coffee, Dog, MapPin, Wifi } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'
import { brand, endereco, historia, horarios, imagens, waLink, waMensagens } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Visite',
  description:
    'Um casarão de 1922 no centro histórico de Sorocaba. Horários, endereço e o que esperar da visita.',
}

const esperar = [
  { icone: Coffee, texto: 'Coado servido na jarra, sem pressa pra você sair' },
  { icone: Wifi, texto: 'Wi-fi e tomadas no salão dos fundos' },
  { icone: Dog, texto: 'Pets bem-vindos no jardim interno' },
  { icone: Clock, texto: 'Brunch de forno aos sábados e domingos, até 12h' },
]

export default function VisitePage() {
  const fotos = imagens.visite

  return (
    <>
      {/* Cabeçalho */}
      <section className="bg-creme pb-16 pt-40 md:pb-24 md:pt-52">
        <div className="container-page">
          <Reveal>
            <p className="kicker">Visite</p>
            <h1 className="mt-6 max-w-2xl text-balance font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
              Vem ficar um pouco.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-espresso/65">{historia.espaco}</p>
          </Reveal>
        </div>
      </section>

      {/* Galeria */}
      <section className="bg-creme pb-24">
        <div className="container-page grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          <Reveal className="col-span-2 md:col-span-2">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <Image src={fotos[0].src} alt={fotos[0].alt} fill priority sizes="(max-width: 768px) 100vw, 66vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[3/4] h-full overflow-hidden rounded-2xl md:aspect-auto">
              <Image src={fotos[1].src} alt={fotos[1].alt} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src={fotos[2].src} alt={fotos[2].alt} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.2} className="col-span-2">
            <div className="relative aspect-[16/9] h-full overflow-hidden rounded-2xl">
              <Image
                src={imagens.espaco[0].src}
                alt={imagens.espaco[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Informações práticas */}
      <section className="bg-espresso py-24 text-creme md:py-32">
        <div className="container-page grid gap-14 md:grid-cols-2 md:gap-20">
          <Reveal>
            <h2 className="font-serif text-3xl tracking-tight md:text-5xl">
              O que esperar da visita.
            </h2>
            <ul className="mt-10 space-y-6">
              {esperar.map(({ icone: Icone, texto }) => (
                <li key={texto} className="flex items-start gap-4 text-sm leading-7 text-creme/75">
                  <Icone size={18} className="mt-1 shrink-0 text-terracota" aria-hidden />
                  {texto}
                </li>
              ))}
            </ul>

            <div className="mt-12 space-y-4 border-t border-creme/10 pt-8 text-sm leading-7 text-creme/70">
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
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={endereco.mapsLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Como chegar
              </a>
              <a
                href={waLink(waMensagens.geral)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-light"
              >
                Falar no WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="h-full overflow-hidden rounded-2xl border border-creme/10">
              <iframe
                src={endereco.mapsEmbed}
                title={`Mapa — ${brand.nomeCompleto}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[420px] w-full border-0 grayscale-[35%] md:h-full md:min-h-[520px]"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

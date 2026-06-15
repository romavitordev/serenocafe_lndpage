import Image from 'next/image'

import { Reveal } from '@/components/ui/Reveal'
import { SplitWords } from '@/components/ui/SplitWords'
import { imagens, waLink, waMensagens } from '@/lib/site'

export function Ritual() {
  return (
    <section className="relative overflow-hidden bg-noite py-36 text-creme md:py-52">
      <div className="absolute inset-0 opacity-25">
        <Image
          src={imagens.ritual.src}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-noite via-noite/40 to-noite" />

      <div className="container-page relative text-center">
        <Reveal>
          <p className="kicker-creme">06 — O ritual</p>
        </Reveal>
        <h2 className="mx-auto mt-8 max-w-3xl font-serif text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.12] tracking-tight">
          <SplitWords text="Toda manhã guarda um instante que é só seu." />
          <br />
          <SplitWords
            text="A gente existe pra ele durar mais."
            delay={0.5}
            className="italic text-terracota"
          />
        </h2>
        <Reveal delay={1}>
          <p className="mx-auto mt-10 max-w-md text-sm leading-7 text-creme/55">
            Abrimos às 7h. O silêncio também.
          </p>
          <div className="mt-10">
            <a
              href={waLink(waMensagens.geral)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-light"
            >
              Fale com a gente
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

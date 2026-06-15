import { Reveal } from '@/components/ui/Reveal'
import { SplitWords } from '@/components/ui/SplitWords'

export function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-creme py-32 md:py-44">
      <div
        className="halo-ambar left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 'min(80vw, 720px)', height: 'min(80vw, 720px)' }}
        aria-hidden
      />
      <div className="container-page relative text-center">
        <Reveal>
          <p className="kicker">01 — Manifesto</p>
        </Reveal>

        {/* Contraste de escala: a frase prepara, "É pausa." domina. */}
        <h2 className="mx-auto mt-10 max-w-4xl text-espresso">
          <SplitWords
            text="O café não é pressa."
            delay={0.1}
            className="block font-serif text-2xl font-normal tracking-tight text-espresso/55 md:text-4xl"
          />
          <span className="mt-2 block font-serif italic leading-[0.95] tracking-tight" style={{ fontSize: 'clamp(4rem, 13vw, 10rem)' }}>
            <SplitWords text="É pausa" delay={0.4} />
            <span className="text-terracota">.</span>
          </span>
        </h2>

        <Reveal delay={0.9}>
          <p className="mx-auto mt-12 max-w-md text-base leading-8 text-espresso/60">
            Torramos pouco, coamos devagar e servimos sem relógio. O resto da
            cidade pode correr — aqui dentro, não.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

import { Reveal } from '@/components/ui/Reveal'
import { SplitWords } from '@/components/ui/SplitWords'

export function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-creme py-32 md:py-44">
      <div className="halo-ambar left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 'min(80vw, 720px)', height: 'min(80vw, 720px)' }} aria-hidden />
      <div className="container-page relative text-center">
        <Reveal>
          <p className="kicker">Manifesto</p>
        </Reveal>
        <h2 className="mx-auto mt-8 max-w-4xl font-serif font-light leading-[1.02] tracking-tight text-espresso" style={{ fontSize: 'clamp(3rem, 8.5vw, 7rem)' }}>
          <SplitWords text="O café não é pressa." delay={0.1} />
          <br />
          <SplitWords
            text="É pausa."
            delay={0.55}
            className="italic text-terracota"
          />
        </h2>
        <Reveal delay={0.9}>
          <p className="mx-auto mt-10 max-w-md text-base leading-8 text-espresso/65">
            Torramos pouco, coamos devagar e servimos sem relógio. O resto da
            cidade pode correr — aqui dentro, não.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

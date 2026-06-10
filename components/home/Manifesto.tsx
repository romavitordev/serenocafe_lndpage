import { Reveal } from '@/components/ui/Reveal'
import { SplitWords } from '@/components/ui/SplitWords'

export function Manifesto() {
  return (
    <section className="bg-creme py-32 md:py-44">
      <div className="container-page text-center">
        <Reveal>
          <p className="kicker">Manifesto</p>
        </Reveal>
        <h2 className="mx-auto mt-8 max-w-3xl font-serif text-[clamp(2.6rem,7vw,5rem)] leading-[1.05] tracking-tight">
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

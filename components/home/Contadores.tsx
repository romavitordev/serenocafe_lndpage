import { Counter } from '@/components/ui/Counter'
import { Reveal } from '@/components/ui/Reveal'
import { contadores } from '@/lib/site'

export function Contadores() {
  return (
    <section className="border-t border-creme/10 bg-espresso py-20 text-creme md:py-24">
      <div className="container-wide grid gap-px overflow-hidden sm:grid-cols-3">
        {contadores.map((item, i) => (
          <Reveal
            key={item.label}
            delay={i * 0.12}
            className="relative px-4 py-6 sm:px-10 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-creme/10"
          >
            <span className="label-mono text-terracota">/0{i + 1}</span>
            <p className="mt-4 flex items-baseline gap-2">
              <Counter valor={item.valor} className="t-num font-mono font-medium leading-none text-creme" />
              <span className="label-mono text-creme/45">{item.sufixo.trim()}</span>
            </p>
            <p className="mt-4 max-w-[16ch] font-serif text-lg italic text-creme/70">{item.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

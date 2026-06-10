import { Counter } from '@/components/ui/Counter'
import { Reveal } from '@/components/ui/Reveal'
import { contadores } from '@/lib/site'

export function Contadores() {
  return (
    <section className="border-t border-creme/10 bg-espresso pb-24 pt-16 text-creme">
      <div className="container-page grid gap-10 text-center sm:grid-cols-3">
        {contadores.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.12}>
            <p className="font-serif text-5xl tracking-tight text-creme md:text-6xl">
              <Counter valor={item.valor} sufixo={item.sufixo} />
            </p>
            <p className="mt-2 text-[0.72rem] uppercase tracking-[0.26em] text-creme/55">
              {item.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

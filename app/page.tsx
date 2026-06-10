import { CardapioDestaques } from '@/components/home/CardapioDestaques'
import { Contadores } from '@/components/home/Contadores'
import { Espaco } from '@/components/home/Espaco'
import { GraosDoMes } from '@/components/home/GraosDoMes'
import { Hero } from '@/components/home/Hero'
import { Jornada } from '@/components/home/Jornada'
import { Manifesto } from '@/components/home/Manifesto'
import { Ritual } from '@/components/home/Ritual'
import { Visite } from '@/components/home/Visite'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Jornada />
      <Contadores />
      <Espaco />
      <CardapioDestaques />
      <GraosDoMes />
      <Ritual />
      <Visite />
    </>
  )
}

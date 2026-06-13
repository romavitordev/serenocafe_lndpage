import { Avaliacoes } from '@/components/home/Avaliacoes'
import { CardapioDestaques } from '@/components/home/CardapioDestaques'
import { Contadores } from '@/components/home/Contadores'
import { Espaco } from '@/components/home/Espaco'
import { Faq } from '@/components/home/Faq'
import { GraosDoMes } from '@/components/home/GraosDoMes'
import { HeroVideoScroll } from '@/components/hero/HeroVideoScroll'
import { Instagram } from '@/components/home/Instagram'
import { Jornada } from '@/components/home/Jornada'
import { Manifesto } from '@/components/home/Manifesto'
import { Newsletter } from '@/components/home/Newsletter'
import { Reserva } from '@/components/home/Reserva'
import { Ritual } from '@/components/home/Ritual'
import { Visite } from '@/components/home/Visite'

export default function HomePage() {
  return (
    <>
      <HeroVideoScroll />
      <Manifesto />
      <Jornada />
      <Contadores />
      <Espaco />
      <CardapioDestaques />
      <GraosDoMes />
      <Ritual />
      <Avaliacoes />
      <Instagram />
      <Newsletter />
      <Reserva />
      <Visite />
      <Faq />
    </>
  )
}

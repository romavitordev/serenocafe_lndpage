import './globals.css'

import type { Metadata } from 'next'
import { DM_Sans, Fraunces, JetBrains_Mono } from 'next/font/google'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { PageTransition } from '@/components/layout/PageTransition'
import { GrainOverlay } from '@/components/fx/GrainOverlay'
import { Preloader } from '@/components/fx/Preloader'
import { CustomCursor } from '@/components/fx/CustomCursor'
import { ScrollProgress } from '@/components/fx/ScrollProgress'
import { AmbientSound } from '@/components/fx/AmbientSound'
import { ReservaModal } from '@/components/home/ReservaModal'
import { avaliacaoResumo, brand, cardapio, endereco, imagens } from '@/lib/site'

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.nome} — ${brand.sufixo}`,
    template: `%s | ${brand.nome}`,
  },
  description: brand.descricao,
  keywords: [
    'café de especialidade',
    'torrefação artesanal',
    'micro-lotes',
    'cafeteria',
    'assinatura de café',
    'Sorocaba',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: brand.url,
    siteName: brand.nomeCompleto,
    title: brand.nomeCompleto,
    description: brand.tagline,
    images: [{ url: imagens.og, width: 1200, height: 630, alt: brand.nomeCompleto }],
  },
  twitter: {
    card: 'summary_large_image',
    title: brand.nomeCompleto,
    description: brand.tagline,
    images: [imagens.og],
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  name: brand.nomeCompleto,
  description: brand.descricao,
  url: brand.url,
  image: imagens.og,
  servesCuisine: 'Café de especialidade',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: endereco.rua,
    addressLocality: endereco.cidade,
    addressRegion: endereco.uf,
    addressCountry: 'BR',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: avaliacaoResumo.media,
    reviewCount: String(avaliacaoResumo.total),
    bestRating: '5',
  },
  hasMenu: {
    '@type': 'Menu',
    hasMenuSection: cardapio.map((c) => ({
      '@type': 'MenuSection',
      name: c.categoria,
      hasMenuItem: c.itens.map((it) => ({ '@type': 'MenuItem', name: it.nome })),
    })),
  },
  sameAs: [brand.instagramUrl],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-terracota focus:px-5 focus:py-2 focus:text-sm focus:text-creme"
        >
          Pular para o conteúdo
        </a>

        <GrainOverlay />
        <Preloader />
        <CustomCursor />
        <ScrollProgress />
        <LenisProvider />
        <Header />
        <PageTransition>
          <main id="conteudo" className="overflow-x-clip">
            {children}
          </main>
        </PageTransition>
        <Footer />
        <ReservaModal />
        <AmbientSound />
      </body>
    </html>
  )
}

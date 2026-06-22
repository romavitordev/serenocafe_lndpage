import type { MetadataRoute } from 'next'

import { brand } from '@/lib/site'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.nomeCompleto,
    short_name: brand.nome,
    description: brand.descricao,
    start_url: `${BASE}/`,
    display: 'standalone',
    background_color: '#F3ECE0',
    theme_color: '#20150E',
    lang: 'pt-BR',
    icons: [{ src: `${BASE}/icon.svg`, sizes: 'any', type: 'image/svg+xml' }],
  }
}

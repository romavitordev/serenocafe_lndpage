import type { MetadataRoute } from 'next'

import { brand } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/cardapio', '/graos', '/visite'].map((rota) => ({
    url: `${brand.url}${rota}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: rota === '' ? 1 : 0.8,
  }))
}

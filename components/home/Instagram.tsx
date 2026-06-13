import Image from 'next/image'
import { Instagram as InstaIcon } from 'lucide-react'

import { Reveal } from '@/components/ui/Reveal'
import { brand, instagram } from '@/lib/site'

export function Instagram() {
  return (
    <section className="bg-creme pb-24 md:pb-32">
      <div className="container-wide">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">No Instagram</p>
            <h2 className="mt-5 font-serif text-3xl tracking-tight md:text-4xl">O dia a dia do casarão.</h2>
          </div>
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="seguir"
            className="inline-flex items-center gap-2 label-mono text-espresso/60 transition-colors hover:text-terracota"
          >
            <InstaIcon size={15} /> {brand.instagram}
          </a>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4 md:gap-3">
          {instagram.map((foto, i) => (
            <a
              key={i}
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="ver"
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(max-width: 768px) 50vw, 22vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-espresso/0 transition-colors duration-300 group-hover:bg-espresso/20" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

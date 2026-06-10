import Link from 'next/link'
import { Instagram, MessageCircle } from 'lucide-react'

import { brand, endereco, horarios, nav, waLink, waMensagens } from '@/lib/site'

export function Footer() {
  const ano = new Date().getFullYear()

  return (
    <footer className="bg-espresso text-creme">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_0.8fr_1fr] md:py-20">
        <div>
          <p className="font-serif text-4xl tracking-tight">Sereno</p>
          <p className="mt-1 text-[0.62rem] uppercase tracking-[0.32em] text-creme/50">
            café &amp; torrefação
          </p>
          <p className="mt-6 max-w-sm text-sm leading-7 text-creme/70">{brand.tagline}</p>
          <a
            href={waLink(waMensagens.assinatura('a combinar'))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-7"
          >
            Assinar café do mês
          </a>
        </div>

        <nav className="grid content-start gap-3 text-sm uppercase tracking-[0.18em] text-creme/75" aria-label="Navegação do rodapé">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-terracota">
              {item.label}
            </Link>
          ))}
          <Link href="/graos#assinatura" className="text-terracota underline-offset-4 hover:underline">
            Assinatura
          </Link>
        </nav>

        <div className="text-sm leading-7 text-creme/70">
          <p>{endereco.linha}</p>
          {horarios.map((h) => (
            <p key={h.dias}>
              {h.dias} · {h.horas}
            </p>
          ))}
          <div className="mt-5 flex gap-4 text-creme">
            <a
              aria-label="WhatsApp do Sereno"
              href={waLink(waMensagens.geral)}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110 hover:text-terracota"
            >
              <MessageCircle size={20} />
            </a>
            <a
              aria-label="Instagram do Sereno"
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110 hover:text-terracota"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="container-page flex flex-col gap-2 border-t border-creme/10 py-6 text-xs text-creme/45 md:flex-row md:items-center md:justify-between">
        <p>© {ano} Sereno — café &amp; torrefação</p>
        <p>Projeto conceitual — marca fictícia para portfólio.</p>
      </div>
    </footer>
  )
}

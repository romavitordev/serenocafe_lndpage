'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { nav } from '@/lib/site'
import { abrirReserva } from '@/components/home/ReservaModal'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] border-b text-espresso backdrop-blur-md transition-colors duration-500 ${
        scrolled ? 'border-espresso/10 bg-creme/90' : 'border-espresso/5 bg-creme/70'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="group flex items-baseline gap-2" aria-label="Sereno — página inicial">
          <span className="font-serif text-2xl tracking-tight md:text-[1.7rem]">Sereno</span>
          <span className="hidden text-[0.6rem] uppercase tracking-[0.3em] opacity-60 transition-opacity group-hover:opacity-100 sm:inline">
            café &amp; torrefação
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[0.78rem] uppercase tracking-[0.22em] transition-opacity hover:opacity-100 ${
                pathname === item.href ? 'opacity-100' : 'opacity-65'
              }`}
            >
              {item.label}
              {pathname === item.href && <span className="mt-1 block h-px w-full bg-terracota" aria-hidden />}
            </Link>
          ))}
          <Link
            href="/graos#assinatura"
            className="text-[0.78rem] uppercase tracking-[0.22em] opacity-65 transition-opacity hover:opacity-100"
          >
            Assinar
          </Link>
          <button type="button" onClick={abrirReserva} className="btn-primary !px-5 !py-2.5 text-[0.78rem]">
            Reservar
          </button>
        </nav>
      </div>
    </header>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

import { nav } from '@/lib/site'
import { abrirReserva } from '@/components/home/ReservaModal'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setAberto(false)
  }, [pathname])

  useEffect(() => {
    if (!aberto) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [aberto])

  // O header nasce sempre visível (a hero é clara): texto espresso, fundo
  // creme translúcido que fica um pouco mais sólido ao rolar.
  const tom = aberto ? 'text-creme' : 'text-espresso'

  const fundo = aberto
    ? 'border-b border-creme/10 bg-espresso'
    : `border-b backdrop-blur-md ${scrolled ? 'border-espresso/10 bg-creme/90' : 'border-espresso/5 bg-creme/70'}`

  return (
    <header className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-500 ${fundo}`}>
      <div className={`container-page flex h-16 items-center justify-between md:h-20 ${tom}`}>
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
              {pathname === item.href && (
                <span className="mt-1 block h-px w-full bg-terracota" aria-hidden />
              )}
            </Link>
          ))}
          <Link
            href="/graos#assinatura"
            className="text-[0.78rem] uppercase tracking-[0.22em] opacity-65 transition-opacity hover:opacity-100"
          >
            Assinar
          </Link>
          <button
            type="button"
            onClick={abrirReserva}
            data-cursor="reservar"
            className="btn-primary !px-5 !py-2.5 text-[0.78rem]"
          >
            Reservar
          </button>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center md:hidden"
          aria-expanded={aberto}
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setAberto((v) => !v)}
        >
          {aberto ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {aberto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 top-16 z-[75] bg-espresso text-creme md:hidden"
        >
            <nav className="container-page flex flex-col gap-2 pt-10" aria-label="Menu móvel">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-creme/10 py-5 font-serif text-4xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.5 }}
                className="flex flex-col gap-3 pt-8"
              >
                <button type="button" onClick={abrirReserva} className="btn-primary w-full">
                  Reservar mesa
                </button>
                <Link href="/graos#assinatura" className="btn-ghost-light w-full">
                  Assinar café
                </Link>
              </motion.div>
            </nav>
        </motion.div>
      )}
    </header>
  )
}

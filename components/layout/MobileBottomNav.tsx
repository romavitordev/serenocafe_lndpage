'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarCheck, Coffee, Home, MapPin, Package } from 'lucide-react'

import { abrirReserva } from '@/components/home/ReservaModal'

const itens = [
  { href: '/', label: 'Início', Icon: Home },
  { href: '/cardapio', label: 'Cardápio', Icon: Coffee },
  { href: '/graos', label: 'Grãos', Icon: Package },
  { href: '/visite', label: 'Visite', Icon: MapPin },
]

/** Navegação inferior — só no mobile, ao alcance do polegar. */
export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Navegação"
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-espresso/10 bg-creme/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-5">
        {itens.map(({ href, label, Icon }) => {
          const ativo = pathname === href
          return (
            <Link
              key={href}
              href={href}
              aria-current={ativo ? 'page' : undefined}
              className={`flex flex-col items-center gap-1 py-2.5 transition-colors ${ativo ? 'text-terracota' : 'text-espresso/55'}`}
            >
              <Icon size={20} strokeWidth={1.75} />
              <span className="text-[0.58rem] font-medium uppercase tracking-[0.1em]">{label}</span>
            </Link>
          )
        })}
        <button
          type="button"
          onClick={abrirReserva}
          className="flex flex-col items-center gap-1 py-2.5 text-terracota transition-colors"
        >
          <CalendarCheck size={20} strokeWidth={1.75} />
          <span className="text-[0.58rem] font-medium uppercase tracking-[0.1em]">Reservar</span>
        </button>
      </div>
    </nav>
  )
}

'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Em produção, aqui entraria o log num serviço de erros.
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-creme px-6 text-center text-espresso">
      <p className="kicker">Algo derramou</p>
      <h1 className="mt-6 max-w-md text-balance font-serif text-3xl tracking-tight md:text-5xl">
        Tropeçamos no café.
      </h1>
      <p className="mt-4 max-w-sm text-base leading-7 text-espresso/60">
        Um erro inesperado aconteceu. Tente de novo — normalmente já resolve.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={reset} className="btn-primary">
          Tentar de novo
        </button>
        <Link href="/" className="btn-ghost-dark">
          Voltar pro início
        </Link>
      </div>
    </main>
  )
}

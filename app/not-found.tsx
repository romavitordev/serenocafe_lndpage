import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-creme px-6 text-center text-espresso">
      <p className="kicker">Erro 404</p>
      <p className="t-num font-mono font-medium leading-none text-terracota">404</p>
      <h1 className="mt-6 max-w-md text-balance font-serif text-3xl tracking-tight md:text-5xl">
        Essa página saiu pra tomar um café.
      </h1>
      <p className="mt-4 max-w-sm text-base leading-7 text-espresso/60">
        A gente não encontrou o que você procurava — mas o coado ainda está quente.
      </p>
      <Link href="/" className="btn-primary mt-9">
        Voltar pro início
      </Link>
    </main>
  )
}

# Sereno — café & torrefação ☕

> **O instante antes do dia começar.**

Site-experiência conceitual para uma cafeteria de café especial **fictícia** — projeto de portfólio. Premium, cinematográfico e minimalista, com dois objetivos trançados: fazer você querer **estar lá** (o espaço) e levar o **café pra casa** (grãos + assinatura).

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** (tokens da marca em `tailwind.config.ts`)
- **GSAP + ScrollTrigger** — hero scrubbed por scroll, "jornada do grão" pinada, parallax
- **Lenis** — smooth scroll
- **Framer Motion** — reveals, split-text, transições de página
- Sem backend: pedidos de grãos/assinatura via **link de WhatsApp pré-preenchido**

## Rodar

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
```

## Onde editar o conteúdo

**Tudo** que é texto/preço/contato vive em [`lib/site.ts`](lib/site.ts): cardápio, grãos, assinatura, horários, endereço, Instagram e WhatsApp.

> ⚠️ O WhatsApp está com número **placeholder** (`5515991023998`). Troque em `brand.whatsapp` antes de qualquer uso real.

As imagens são placeholders do Unsplash (marca fictícia) — os URLs também ficam em `lib/site.ts` (`imagens`, `graos[].imagem`, `jornada[].imagem`).

## Vídeo da hero (opcional, recomendado)

A hero é **scrubbed por scroll**: sem vídeo, ela usa imagem com zoom lento; com vídeo, o tempo do vídeo segue o scroll (a água do coado desce conforme você rola).

1. Consiga um vídeo de pour-over em câmera lenta (5–8s, sem áudio).
2. Re-encode **all-intra** (keyframe em todo frame — essencial pra scrub suave):

   ```bash
   ffmpeg -i original.mp4 -an -g 1 -keyint_min 1 -sc_threshold 0 -bf 0 \
     -c:v libx264 -preset slow -crf 21 -movflags +faststart public/media/hero.mp4
   ```

3. Pronto — o componente (`components/home/Hero.tsx`) detecta `/media/hero.mp4` sozinho.

## Acessibilidade & performance

- `prefers-reduced-motion` desliga Lenis, scrubs e pins (versões estáticas equivalentes).
- Texto real em `sr-only` nos reveals split-text; `alt` descritivo em todas as fotos.
- SEO: metadata completa, OG, sitemap, robots e JSON-LD `CafeOrCoffeeShop`.

## Estrutura

```
app/            páginas: / · /cardapio · /graos · /visite
components/
  layout/       Header, Footer, LenisProvider, PageTransition
  home/         Hero, Manifesto, Jornada (pinada), Contadores,
                Espaco, CardapioDestaques, GraosDoMes, Ritual, Visite
  ui/           Reveal, SplitWords, Counter
lib/site.ts     todo o conteúdo editável
```

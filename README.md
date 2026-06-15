# Sereno — café & torrefação ☕

> **O instante antes do dia começar.**

Site-experiência conceitual para uma cafeteria de café especial **fictícia** — projeto de portfólio. Premium, cinematográfico e minimalista, com dois objetivos trançados: fazer você querer **estar lá** (o espaço) e levar o **café pra casa** (grãos + assinatura).

## Stack

- **Next.js 14** (App Router) + TypeScript · **Tailwind CSS** (tokens em `tailwind.config.ts`)
- **GSAP + ScrollTrigger** — hero scrubbed por scroll, "jornada do grão" pinada, parallax
- **Lenis** (smooth scroll) · **Framer Motion** (reveals, split-text)
- Tipografia: **Fraunces** (display) · **DM Sans** (corpo) · **JetBrains Mono** (rótulos/números/preços)
- Sem backend (static export, GitHub Pages): reserva/pedido via **WhatsApp pré-preenchido**; newsletter via Formspree

## Rodar

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
```

## Momentos-assinatura

- **Preloader** de marca (só 1ª visita da sessão) · **cursor custom** (desktop) · **cortina** de transição entre páginas · **barra de progresso** de scroll
- **Hero**: o vídeo (`video_cafe.mp4`) é controlado pelo scroll — a espiral de café retorna à xícara conforme você desce, e reconstrói conforme você sobe
- **"O espaço"**: galeria **arrastável** com inércia e skew por velocidade
- **Som ambiente** opt-in (canto inferior esquerdo)
- Tudo respeita `prefers-reduced-motion` (versões estáticas equivalentes)

## Camada comercial

Reserva de mesa (modal → WhatsApp), Clube Sereno (newsletter), mural de avaliações, grade do Instagram, FAQ, delivery — tudo sem backend.

## Onde editar o conteúdo

**Tudo** que é texto/preço/contato vive em [`lib/site.ts`](lib/site.ts): cardápio, grãos, assinatura, horários, endereço, Instagram, WhatsApp, avaliações, FAQ, reserva, newsletter, delivery.

> ⚠️ **Placeholders a trocar antes de uso real:**
> - WhatsApp: `brand.whatsapp` (hoje `5515991023998`)
> - Newsletter: `newsletter.formspree` (enquanto for `SEU_ENDPOINT`, o form roda em **modo-demo** sem enviar nada)
> - Imagens: URLs do Unsplash (marca fictícia)

## Hero — o vídeo

O `video_cafe.mp4` já foi re-encodado **all-intra** (keyframe em todo frame, essencial pro scrub liso) para `public/media/`:

```bash
ffmpeg -i video_cafe.mp4 -an -vf "scale=-2:1080" -c:v libx264 -preset slow -crf 25 \
  -g 1 -keyint_min 1 -sc_threshold 0 -bf 0 -movflags +faststart public/media/hero.mp4
# mobile: scale=-2:720 -> hero-mobile.mp4 · poster: -frames:v 1 -> hero-poster.jpg
```

Pra trocar o vídeo, re-encode com o comando acima. Sem o arquivo, a hero cai pro poster estático (nunca foto + zoom).

## Som ambiente

`public/audio/ambiente.mp3` é um **room tone placeholder** (brown noise filtrado). Troque por um loop de café/vinil real (curto e loopável) mantendo o nome.

## Acessibilidade & performance

- `prefers-reduced-motion` desliga preloader, scrub, cursor, vapor, som e galeria arrastável.
- Modal de reserva e menu: focus-trap, ESC, retorno de foco, `aria`.
- SEO: metadata, OG, sitemap, robots e JSON-LD `CafeOrCoffeeShop` com `aggregateRating` + `hasMenu`.

## Estrutura

```
app/            páginas: / · /cardapio · /graos · /visite
components/
  hero/         HeroVideoScroll
  fx/           Preloader, CustomCursor, ScrollProgress, GrainOverlay, AmbientSound
  layout/       Header, Footer, LenisProvider, PageTransition
  home/         Manifesto, Jornada, Contadores, Espaco (galeria), CardapioDestaques,
                GraosDoMes, Ritual, Avaliacoes, Instagram, Newsletter, Reserva (+modal), Faq, Visite
  ui/           Reveal, SplitWords, Counter
lib/site.ts     todo o conteúdo editável
public/media/   hero.mp4 · hero-mobile.mp4 · hero-poster.jpg
```

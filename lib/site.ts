/**
 * Sereno — café & torrefação
 * ---------------------------------------------------------------
 * TODO o conteúdo editável do site vive aqui: textos, cardápio,
 * grãos, assinatura, horários, endereço e contatos.
 * Marca FICTÍCIA — projeto conceitual de portfólio.
 */

export const brand = {
  nome: 'Sereno',
  sufixo: 'café & torrefação',
  nomeCompleto: 'Sereno — café & torrefação',
  tagline: 'O instante antes do dia começar.',
  descricao:
    'Microtorrefação e café de especialidade num casarão de 1922 no centro histórico. Micro-lotes brasileiros, torra própria toda semana e um espaço onde a pressa não entra.',
  // PLACEHOLDER — troque pelo número real (somente dígitos, com DDI).
  whatsapp: '5515991023998',
  instagram: '@sereno.cafe',
  instagramUrl: 'https://www.instagram.com/sereno.cafe',
  email: 'ola@sereno.cafe',
  url: 'https://sereno.cafe',
}

export const endereco = {
  rua: 'Rua das Palmeiras, 87',
  bairro: 'Centro Histórico',
  cidade: 'Sorocaba',
  uf: 'SP',
  linha: 'Rua das Palmeiras, 87 — Centro Histórico, Sorocaba/SP',
  mapsEmbed:
    'https://www.google.com/maps?q=Rua+das+Palmeiras+87+Centro+Sorocaba+SP&output=embed',
  mapsLink:
    'https://www.google.com/maps/search/?api=1&query=Rua+das+Palmeiras+87+Centro+Sorocaba+SP',
}

export const horarios = [
  { dias: 'Terça a sexta', horas: '7h às 19h' },
  { dias: 'Sábado e domingo', horas: '8h às 18h' },
  { dias: 'Segunda', horas: 'Fechado' },
]

export const nav = [
  { href: '/cardapio', label: 'Cardápio' },
  { href: '/graos', label: 'Grãos' },
  { href: '/visite', label: 'Visite' },
]

/** Monta um link de WhatsApp com mensagem pré-preenchida. */
export function waLink(mensagem: string) {
  return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(mensagem)}`
}

export const waMensagens = {
  geral: 'Oi! Vim pelo site do Sereno.',
  grao: (nome: string, preco: string) =>
    `Oi! Quero pedir o grão ${nome} (250g — ${preco}). Como funciona a retirada ou entrega?`,
  assinatura: (plano: string) =>
    `Oi! Quero assinar o Sereno — plano ${plano}. Pode me explicar os próximos passos?`,
}

/* ------------------------------------------------------------------ */
/* Cardápio                                                            */
/* ------------------------------------------------------------------ */

export type ItemCardapio = { nome: string; descricao?: string; preco: string }

export const cardapio: { categoria: string; nota?: string; itens: ItemCardapio[] }[] = [
  {
    categoria: 'Métodos',
    nota: 'Todos os métodos saem com o grão da semana. Pergunte qual está no moinho.',
    itens: [
      { nome: 'Espresso', descricao: 'Curto, doce, extraído na faixa de 25s.', preco: 'R$ 7' },
      { nome: 'Coado V60', descricao: 'O nosso ritual. Servido na jarra, rende duas xícaras.', preco: 'R$ 16' },
      { nome: 'Prensa francesa', descricao: 'Corpo cheio, quatro minutos de infusão.', preco: 'R$ 15' },
      { nome: 'Aeropress', descricao: 'Limpo e intenso, pressão na medida.', preco: 'R$ 16' },
      { nome: 'Cold brew', descricao: 'Extração a frio por 18 horas. Servido com gelo de café.', preco: 'R$ 14' },
    ],
  },
  {
    categoria: 'Com leite',
    itens: [
      { nome: 'Flat white', descricao: 'Dose dupla, microespuma fina.', preco: 'R$ 13' },
      { nome: 'Cortado', descricao: 'Metade café, metade leite vaporizado.', preco: 'R$ 11' },
      { nome: 'Cappuccino', descricao: 'Clássico, sem canela — a não ser que você peça.', preco: 'R$ 13' },
      { nome: 'Latte', descricao: 'Suave, com latte art da casa.', preco: 'R$ 14' },
    ],
  },
  {
    categoria: 'Autorais',
    nota: 'Receitas da casa, criadas na bancada de torra.',
    itens: [
      { nome: 'Sereno', descricao: 'Espresso, tônica gelada e casca de laranja.', preco: 'R$ 18' },
      { nome: 'Manhã de Cerrado', descricao: 'Latte adoçado com rapadura, toque de baunilha.', preco: 'R$ 16' },
    ],
  },
  {
    categoria: 'Comidas',
    itens: [
      { nome: 'Pão de fermentação natural', descricao: 'Fatia grossa, manteiga de garrafa.', preco: 'R$ 12' },
      { nome: 'Bolo de fubá cremoso', descricao: 'Receita da avó da casa, ponto de cremoso exato.', preco: 'R$ 11' },
      { nome: 'Cookie de cacau 70%', descricao: 'Casquinha crocante, centro macio.', preco: 'R$ 9' },
      { nome: 'Ovos no brioche', descricao: 'Ovos moles, brioche tostado na manteiga, ervas.', preco: 'R$ 24' },
      { nome: 'Granola da casa', descricao: 'Iogurte, mel do produtor e frutas da estação.', preco: 'R$ 18' },
    ],
  },
]

/** Destaques mostrados na home. */
export const destaquesCardapio = [
  { nome: 'Sereno', descricao: 'Espresso, tônica gelada e casca de laranja.', preco: 'R$ 18', tag: 'Autoral' },
  { nome: 'Coado V60', descricao: 'O nosso ritual. Servido na jarra, rende duas xícaras.', preco: 'R$ 16', tag: 'Método' },
  { nome: 'Manhã de Cerrado', descricao: 'Latte adoçado com rapadura, toque de baunilha.', preco: 'R$ 16', tag: 'Autoral' },
  { nome: 'Bolo de fubá cremoso', descricao: 'Receita da avó da casa, ponto de cremoso exato.', preco: 'R$ 11', tag: 'Comida' },
]

/* ------------------------------------------------------------------ */
/* Grãos & assinatura                                                  */
/* ------------------------------------------------------------------ */

export type Grao = {
  id: string
  nome: string
  origem: string
  processo: string
  altitude: string
  notas: string[]
  torra: string
  preco: string
  descricao: string
  imagem: string
  imagemAlt: string
}

export const graos: Grao[] = [
  {
    id: 'cerrado',
    nome: 'Cerrado',
    origem: 'Cerrado Mineiro — MG',
    processo: 'Natural',
    altitude: '1.100 m',
    notas: ['Chocolate', 'Caramelo', 'Nozes'],
    torra: 'Média',
    preco: 'R$ 42',
    descricao:
      'O grão de todo dia da casa. Doce, redondo e sem pressa — feito para o primeiro café da manhã e para o último da tarde.',
    imagem:
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80',
    imagemAlt: 'Grãos de café torrados espalhados sobre superfície escura',
  },
  {
    id: 'catuai-amarelo',
    nome: 'Catuaí Amarelo',
    origem: 'Sul de Minas — MG',
    processo: 'Lavado',
    altitude: '1.200 m',
    notas: ['Laranja', 'Mel', 'Floral'],
    torra: 'Média-clara',
    preco: 'R$ 46',
    descricao:
      'Limpo e luminoso. A acidez da laranja chega primeiro, o mel segura o final. Nosso preferido no coado.',
    imagem:
      'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=1200&q=80',
    imagemAlt: 'Duas xícaras de café sobre barril de madeira, com folhagens ao redor',
  },
  {
    id: 'diamantina',
    nome: 'Diamantina',
    origem: 'Chapada Diamantina — BA',
    processo: 'Natural',
    altitude: '1.300 m',
    notas: ['Morango', 'Vinho', 'Cacau'],
    torra: 'Clara',
    preco: 'R$ 52',
    descricao:
      'O micro-lote raro da estação. Frutado, vinoso, quase sobremesa. Poucas sacas, torra clara para não esconder nada.',
    imagem:
      'https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&w=1200&q=80',
    imagemAlt: 'Xícara escura com grãos de café saltando, em luz dramática',
  },
]

export const assinatura = {
  nome: 'Assinatura Sereno',
  mote: 'O café muda. A calma fica.',
  descricao:
    'Todo mês, um micro-lote diferente da nossa curadoria chega na sua casa, torrado na semana do envio. Grão inteiro ou moído sob medida para o seu método.',
  planos: [
    { nome: '250g por mês', preco: 'R$ 39', detalhe: 'Rende ~18 xícaras. Para quem bebe café em ritual.' },
    { nome: '500g por mês', preco: 'R$ 72', detalhe: 'Para casas onde o coado é coletivo.' },
  ],
  beneficios: [
    'Curadoria rotativa de micro-lotes',
    'Torrado na semana do envio',
    'Mensal ou bimestral — você escolhe',
    'Frete incluso na região',
    'Pause ou cancele quando quiser',
  ],
}

/* ------------------------------------------------------------------ */
/* História & números                                                  */
/* ------------------------------------------------------------------ */

export const historia = {
  curta:
    'O Sereno nasceu da obsessão por aquele primeiro gole silencioso antes do mundo acordar. Uma microtorrefação e um café-refúgio num casarão de 1922, trabalhando micro-lotes de origens brasileiras, torrados em pequena escala — e servidos sem pressa.',
  espaco:
    'Um casarão de 1922 no centro histórico. Pé-direito alto, madeira que range baixinho, luz âmbar que atravessa a tarde. A torra acontece no fundo; o cheiro avisa.',
}

export const contadores = [
  { valor: 12, sufixo: ' anos', label: 'de torra artesanal' },
  { valor: 180, sufixo: ' kg', label: 'torrados por mês' },
  { valor: 9, sufixo: ' origens', label: 'visitadas no Brasil' },
]

/* ------------------------------------------------------------------ */
/* Jornada do grão (seção pinada da home)                              */
/* ------------------------------------------------------------------ */

export const jornada = [
  {
    numero: '01',
    titulo: 'Na fazenda',
    texto:
      'Micro-lotes escolhidos no pé. Cerrado, Sul de Minas, Chapada — a gente visita, prova e escolhe junto com quem planta.',
    imagem:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
    imagemAlt: 'Campo ao amanhecer, com o sol nascendo sobre a lavoura',
    notas: ['Colheita seletiva', 'Origens brasileiras'],
  },
  {
    numero: '02',
    titulo: 'Na torra',
    texto:
      'Lotes pequenos, perfis claros. Torramos toda semana, nos fundos do casarão, em levas de 12 kg.',
    imagem:
      'https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&w=1600&q=80',
    imagemAlt: 'Close de grãos de café recém-torrados',
    notas: ['Levas de 12 kg', 'Torra da semana'],
  },
  {
    numero: '03',
    titulo: 'Na xícara',
    texto:
      'Notas que aparecem sem esforço: chocolate, laranja, morango. O resto é silêncio.',
    imagem:
      'https://images.unsplash.com/photo-1522992319-0365e5f11656?auto=format&fit=crop&w=1600&q=80',
    imagemAlt: 'Café sendo servido na xícara, com vapor subindo',
    notas: ['Chocolate', 'Laranja', 'Morango'],
  },
]

/* ------------------------------------------------------------------ */
/* Imagens (Unsplash — placeholders do conceito)                       */
/* ------------------------------------------------------------------ */

export const imagens = {
  hero: {
    src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=2000&q=80',
    alt: 'Barista preparando café coado em câmera lenta, luz quente',
  },
  og: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80',
  espaco: [
    {
      src: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1400&q=80',
      alt: 'Interior do café com sofás, plantas e luz natural',
    },
    {
      src: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1200&q=80',
      alt: 'Balcão do café visto da janela, com xícaras e cafeteiras',
    },
    {
      src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=80',
      alt: 'Ambiente acolhedor do café com pessoas conversando ao fundo',
    },
    {
      src: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80',
      alt: 'Bancada de madeira do café com banquetas e luz âmbar',
    },
  ],
  ritual: {
    src: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=1600&q=80',
    alt: 'Xícara de café fumegante sobre mesa escura de madeira',
  },
  visite: [
    {
      src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80',
      alt: 'Fachada interna do café com cadeiras e mesas em tons quentes',
    },
    {
      src: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=1200&q=80',
      alt: 'Clientes conversando no balcão movimentado do café',
    },
    {
      src: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1200&q=80',
      alt: 'Bancada com café moído, portafilter e xícara de latte',
    },
  ],
  graosHero: {
    src: 'https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=1600&q=80',
    alt: 'Saca de juta cheia de grãos de café',
  },
  cardapioHero: {
    src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80',
    alt: 'Xícaras de café com latte art entre plantas',
  },
}

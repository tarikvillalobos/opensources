// presets.js — builds a large catalogue of NON-REPEATING components.
// Each item gets its own NAME, its own COPY (text content) and its own THEME,
// so no two cards read as "the same component recolored". Structure still comes
// from the 44 base motion engines, but content + identity are unique per card.
import { MOTIONS } from "./motions";

/* ---- theme palettes (accent / secondary / tertiary + dark bg) -------- */
const PACKS = [
  { accent: '#c8ff2d', c2: '#5b8cff', c3: '#ff4d8d' },
  { accent: '#39ff14', c2: '#ff2bd6', c3: '#21d4fd' },
  { accent: '#ff7a18', c2: '#ff3d7f', c3: '#ffcc00' },
  { accent: '#2bd4ff', c2: '#5b8cff', c3: '#19c37d' },
  { accent: '#a855f7', c2: '#5b8cff', c3: '#ff4d8d' },
  { accent: '#19c37d', c2: '#c8ff2d', c3: '#2bd4ff' },
  { accent: '#ff2d55', c2: '#ff7a18', c3: '#ffd23f' },
  { accent: '#ffd23f', c2: '#ff7a18', c3: '#c8ff2d' },
  { accent: '#00fff0', c2: '#ff00aa', c3: '#7a5cff' },
  { accent: '#ff5c5c', c2: '#ffa14d', c3: '#ffd23f' },
  { accent: '#4dffd2', c2: '#2bd4ff', c3: '#c8ff2d' },
  { accent: '#7c5cff', c2: '#c08cff', c3: '#ff8cf0' },
];
const DARK_BGS = ['#0a0a0a', '#0b0d12', '#0d0a16', '#0a1014', '#120a0a', '#0a0c10', '#101014', '#0c0f0c'];
const FONTS_P = ['geist', 'grotesk', 'condensed', 'serif', 'mono'];

/* ---- content pools (pt-BR) ------------------------------------------- */
const PHRASE = ['ideias que *se movem*', 'feito para *criar*', 'menos é *mais*', 'comece *agora*', 'pense *diferente*',
  'simples *assim*', 'mude o *jogo*', 'sem *limites*', 'crie sem *medo*', 'o futuro é *aberto*', 'movimento é *vida*',
  'a tela é *sua*', 'design que *fala*', 'rápido e *livre*', 'feito à *mão*', 'energia em *cada* frame', 'conteúdo que *gruda*',
  'sua marca em *movimento*', 'conta a sua *história*', 'destaque o que *importa*', 'menos ruído, mais *sinal*',
  'criatividade *aberta*', 'do rascunho ao *post*', 'copie, edite, *poste*', 'feito para *todos*', 'a ideia vem *primeiro*',
  'a forma segue a *função*', 'cada frame *conta*', 'feito com *alma*', 'do zero ao *viral*', 'sua voz em *movimento*',
  'o detalhe faz o *todo*', 'tudo começa com uma *ideia*', 'simplifique e *brilhe*', 'mostre, não *conte*', 'crie todo *dia*',
  'a marca que se *move*', 'pixels com *propósito*', 'menos esforço, mais *impacto*', 'abra, edite, *publique*'];
const SHORT = ['AGORA', 'BOOM', 'OPEN', 'FOCO', 'VAI', 'NOVO', 'PLAY', 'LIVE', 'HOJE', 'MAIS', 'PRO', 'PURE', 'REAL',
  'BOLD', 'NEXT', 'DROP', 'GO', 'SIM', 'RAW', 'TOP', 'UP', 'ZAP', 'POW', 'YES', 'NOW', 'HYPE', 'GLOW', 'RUSH',
  'FLOW', 'EDGE', 'WOW', 'EPIC', 'PEAK', 'VIVO', 'CRIA', 'ARTE', 'LOOP', 'BEAT', 'SOLO', 'MEGA', 'ULTRA', 'PUNCH'];
const QUOTE = ['o design não é como parece, é como *funciona*', 'feito com *intenção*', 'simplicidade é o último grau de *sofisticação*',
  'criatividade é inteligência se *divertindo*', 'faça coisas que *importam*', 'a forma segue a *emoção*', 'menos, porém *melhor*',
  'comece antes de estar *pronto*', 'a ideia é só o *começo*', 'movimento conta *histórias*', 'detalhe não é *detalhe*',
  'crie todo *dia*', 'o impossível é só uma *opinião*', 'edite com *coragem*', 'sua voz, seu *ritmo*', 'feito para ser *sentido*',
  'design é *resolver* problemas', 'a melhor ideia ainda está por *vir*', 'ouse *errar* rápido', 'o que move, *comove*',
  'crie com *propósito*', 'beleza está na *clareza*', 'cada corte é uma *escolha*', 'inspire-se, mas seja *você*'];
const WORDS = ['rápidos,ousados,abertos', 'criadores,marcas,você,todos', 'hoje,amanhã,sempre', 'design,motion,código',
  'simples,direto,bonito', 'menos,foco,mais', 'ideia,forma,post', 'livre,aberto,seu', 'arte,dado,emoção',
  'pense,crie,poste', 'rápido,leve,fluido', 'novo,raro,único', 'copie,edite,baixe', 'real,puro,cru',
  'ver,sentir,criar', 'corte,cole,poste', 'sonhe,faça,mostre', 'menos,melhor,sempre', 'cor,forma,ritmo',
  'foco,fluxo,flow', 'bold,calmo,vivo', 'do,re,mi'];
const CONNECT = ['somos', 'feito para', 'isso é', 'nós', 'aqui o', 'pensado para', 'criado por', 'tudo é', 'a gente é'];
const HLWORD = ['importante', 'novo', 'grátis', 'exclusivo', 'agora', 'real', 'aberto', 'único', 'raro', 'feito', 'fácil', 'rápido', 'seu', 'épico'];
const LISTS = [['copiar', 'editar', 'baixar', 'postar'], ['planeje', 'crie', 'publique'], ['escolha', 'ajuste', 'exporte'],
  ['ideia', 'rascunho', 'final'], ['grave', 'corte', 'poste'], ['simples', 'rápido', 'aberto', 'seu'],
  ['descubra', 'edite', 'compartilhe'], ['menos é mais', 'foco no essencial', 'feito à mão'], ['pense', 'faça', 'mostre'],
  ['abra', 'copie', 'cole', 'pronto'], ['filme', 'edite', 'publique'], ['crie', 'teste', 'lance'],
  ['observe', 'esboce', 'refine'], ['ouça', 'crie', 'repita'], ['comece', 'continue', 'conclua'],
  ['veja', 'curta', 'salve'], ['rascunhe', 'pinte', 'finalize'], ['imagine', 'monte', 'mostre'],
  ['capture', 'corte', 'compartilhe'], ['anote', 'desenhe', 'entregue']];
const CHATS = [['já viu o OpenSources?', 'vi! que demais', 'dá pra editar tudo'], ['terminou o vídeo?', 'tá quase', 'manda quando puder'],
  ['de onde é esse motion?', 'OpenSources, é aberto', 'vou usar agora'], ['curti o design', 'valeu! é editável', 'perfeito'],
  ['como fez essa animação?', 'peguei pronta', 'sério? me passa'], ['preciso de um reels', 'usa o OpenSources', 'salvou meu dia'],
  ['esse texto anima?', 'anima sim', 'incrível'], ['posso editar a cor?', 'pode tudo', 'amei'],
  ['ficou profissional', 'e foi rapidíssimo', 'bora postar'], ['qual fonte é essa?', 'dá pra trocar', 'show']];
const NAMES = ['Marina Costa', 'João Pedro', 'Ana Luiza', 'Rafael Souza', 'Beatriz Lima', 'Lucas Andrade', 'Camila Reis',
  'Pedro Henrique', 'Júlia Martins', 'Gabriel Rocha', 'Sofia Almeida', 'Thiago Nunes', 'Larissa Dias', 'Bruno Carvalho',
  'Manuela Pires', 'Felipe Ramos', 'Helena Castro', 'Vinícius Melo', 'Isabela Freitas', 'Daniel Barros', 'Clara Monteiro', 'Igor Teixeira'];
const ROLES = ['Designer', 'Diretora de criação', 'Fundador', 'Editor de vídeo', 'Social media', 'Diretora de arte',
  'Motion designer', 'Creator', 'Diretor de conteúdo', 'Estrategista', 'Produtora', 'Roteirista', 'Ilustradora', 'Diretor de marca'];
const VALUES = ['12500', '87', '940', '1000000', '2400', '340', '99', '73', '58000', '4200', '128', '67', '15300', '92', '8800', '36', '270000', '63', '1900', '45'];
const LABELS = ['seguidores', 'satisfação', 'downloads', 'curtidas', 'alcance', 'vendas', 'inscritos', 'projetos',
  'visualizações', 'compartilhamentos', 'novos fãs', 'cliques', 'conversão', 'engajamento', 'comentários', 'salvos'];
const AUTHORS = ['Steve Jobs', 'OpenSources', 'Dieter Rams', 'Paula Scher', 'Massimo Vignelli', 'a comunidade', 'Saul Bass',
  'Stefan Sagmeister', 'um criador', 'você mesmo', 'Charles Eames', 'Jony Ive', 'um anônimo genial', 'a equipe'];
const KICKERS = ['apresentamos', 'novidade', 'exclusivo', 'ao vivo', 'recém-chegado', 'edição limitada', 'só hoje', 'em breve', 'lançamento', 'destaque', 'imperdível', 'primeira vez'];
const TITLES = ['OpenSources', 'Novo drop', 'Atualização', 'Seu vídeo', 'Coleção nova', 'Aviso', 'Edição limitada', 'Recado', 'Novidade', 'Lembrete'];
const TAGS = ['novo episódio', 'disponível agora', 'edição limitada', 'estreia hoje', 'só esta semana', 'bastidores',
  'parte 2', 'ao vivo agora', 'última chance', 'recém-lançado', 'temporada nova', 'spoiler', 'tutorial', 'making of',
  'pré-venda', 'em alta', 'exclusivo', 'destaque da semana', 'capítulo final', 'edição especial'];
const LOCS = ['São Paulo, BR', 'Rio de Janeiro', 'Lisboa, PT', 'New York', 'Tokyo', 'Berlin', 'Curitiba, BR', 'Porto, PT', 'Paris', 'Londres',
  'Madrid', 'Buenos Aires', 'Cidade do México', 'Toronto', 'Amsterdã', 'Milão', 'Seul', 'Sydney', 'Salvador, BR', 'Recife, BR'];
const DISCOUNT = ['-50%', '-70%', '2x1', '-30%', 'FREE', '-90%', '-25%', 'BLACK', '-40%', '-60%', '-15%', 'COMBO', '-80%', 'GRÁTIS', '-35%', '3x2'];
const SUBS = ['só hoje', 'disponível', 'agora', 'grátis', 'limitado', 'novo', 'por tempo limitado', 'enquanto durar'];
const CTA = ['Inscreva-se', 'Saiba mais', 'Comece já', 'Baixe agora', 'Assine', 'Toque aqui', 'Arrasta pra cima', 'Garanta o seu'];
const STATES = [['Seguir', 'Seguindo'], ['Inscrever', 'Inscrito'], ['Assinar', 'Assinado'], ['Curtir', 'Curtido'], ['Salvar', 'Salvo'], ['Ativar', 'Ativado'], ['Entrar', 'Conectado'], ['Comprar', 'Comprado']];
const MARQ2 = ['COPIE · EDITE · POSTE', 'OPEN SOURCE', 'SEM LIMITES', 'FEITO PARA CRIAR', 'MOTION ABERTO'];

/* which "text" pool fits each motion's main text field */
const TEXTKIND = {
  'word-rise': PHRASE, 'punch-in': SHORT, 'scramble': SHORT, 'type-writer': PHRASE, 'slide-words': PHRASE,
  'stagger-letters': SHORT, 'gradient-text': SHORT, 'line-reveal': PHRASE, 'mesh-flow': SHORT, 'grid-pulse': SHORT,
  'noise-gradient': SHORT, 'stripes': SHORT, 'spotlight': SHORT, 'kicker-word': SHORT, 'swipe-cta': CTA,
  'pulse-badge': SHORT, 'live-badge': SHORT, 'sale-burst': DISCOUNT, 'tag-pop': TAGS, 'location-tag': LOCS,
  'quote-mark': QUOTE, 'testimonial': QUOTE, 'big-quote': QUOTE, 'tweet-card': PHRASE, 'highlight-sweep': HLWORD,
  'checklist': null, 'steps': null, 'chat-bubble': null, 'news-ticker': PHRASE, 'pill-pop': null, 'marquee': SHORT,
};

const pick = (pool, i) => pool[((i % pool.length) + pool.length) % pool.length];
const slug = (n) => '@' + String(n).toLowerCase().split(' ')[0].replace(/[^a-z]/g, '');

/* fill a motion's text-type fields with fresh copy for index i */
function makeContent(m, i) {
  const out = {};
  const nm = pick(NAMES, i);
  m.fields.forEach((f, fi) => {
    if (f.type !== 'text' && f.type !== 'area') return;
    const j = i * 3 + fi * 7;
    switch (f.key) {
      case 'name': out.name = nm; break;
      case 'handle': out.handle = slug(nm); break;
      case 'role': out.role = pick(ROLES, j); break;
      case 'by': out.by = pick(AUTHORS, j); break;
      case 'kicker': out.kicker = pick(KICKERS, j); break;
      case 'title': out.title = pick(TITLES, j); break;
      case 'label': out.label = pick(LABELS, j); break;
      case 'l1': out.l1 = pick(LABELS, j); break;
      case 'l2': out.l2 = pick(LABELS, j + 1); break;
      case 'l3': out.l3 = pick(LABELS, j + 2); break;
      case 'value': out.value = pick(VALUES, j); break;
      case 'v1': out.v1 = pick(['90', '72', '64', '88', '55', '41', '78'], j); break;
      case 'v2': out.v2 = pick(['68', '52', '83', '47', '61', '95', '38'], j); break;
      case 'v3': out.v3 = pick(['41', '77', '59', '33', '88', '52'], j); break;
      case 'words': out.words = pick(WORDS, j); break;
      case 'pre': out.pre = pick(CONNECT, j); break;
      case 'post': out.post = ''; break;
      case 'word': out.word = pick(HLWORD, j); break;
      case 'sub': out.sub = pick(SUBS, j); break;
      case 'text2': out.text2 = m.id === 'marquee' ? pick(MARQ2, j) : pick(SHORT, j); break;
      case 'prefix': break; case 'suffix': break;
      case 'label2': break;
      case 'text': {
        if (m.id === 'follow-btn') { const s = pick(STATES, j); out.text = s[0]; out.text2 = s[1]; break; }
        if (m.id === 'checklist' || m.id === 'steps') { out.text = pick(LISTS, j).join('\n'); break; }
        if (m.id === 'chat-bubble') { out.text = pick(CHATS, j).join('\n'); break; }
        if (m.id === 'pill-pop') { out.text = pick(WORDS, j).split(',').join(', '); break; }
        if (m.id === 'big-quote' || m.id === 'line-reveal') { out.text = pick(QUOTE, j).replace(/ /g, (s => { let c = 0; return () => (++c % 3 === 0 ? '\n' : ' '); })()); break; }
        const pool = TEXTKIND[m.id] || PHRASE;
        if (pool) out.text = pick(pool, j);
        break;
      }
      default: break;
    }
  });
  return out;
}

/* ---- unique names ---------------------------------------------------- */
const NOUN = ['Pulse', 'Drift', 'Echo', 'Flux', 'Bloom', 'Surge', 'Spark', 'Glow', 'Wave', 'Dash', 'Beam', 'Rise', 'Fade',
  'Shift', 'Loop', 'Burst', 'Flare', 'Orbit', 'Halo', 'Prism', 'Vortex', 'Cascade', 'Ripple', 'Comet', 'Nova', 'Ember',
  'Quartz', 'Onyx', 'Helix', 'Pixel', 'Vapor', 'Strobe', 'Reel', 'Frame', 'Stride', 'Bolt', 'Aura', 'Mirage', 'Zephyr',
  'Lumen', 'Static', 'Crest', 'Trace', 'Phase'];
const ADJ = ['Bold', 'Soft', 'Sharp', 'Neon', 'Mono', 'Vivid', 'Lush', 'Crisp', 'Swift', 'Slick', 'Prime', 'Pure', 'Hyper',
  'Ultra', 'Micro', 'Mega', 'Retro', 'Modern', 'Minimal', 'Punchy', 'Smooth', 'Rapid', 'Calm', 'Loud', 'Bright', 'Dark',
  'Electric', 'Cosmic', 'Lunar', 'Solar', 'Atomic', 'Velvet', 'Chrome', 'Liquid', 'Frost', 'Amber', 'Coral', 'Jade', 'Ruby', 'Slate'];

/* ---- build the catalogue --------------------------------------------- */
const PER_BASE = 30;        // 44 * 30 = 1320 candidates -> 1000+ unique after content-dedup
const CATALOG = [];
const seenItem = new Set();

// all Noun+Adj combos, deterministically shuffled so adjacent cards vary
const COMBOS = [];
for (let n = 0; n < NOUN.length; n++) for (let a = 0; a < ADJ.length; a++) COMBOS.push(NOUN[n] + ' ' + ADJ[a]);
let _s = 1234567;
const _rnd = () => { _s = (_s * 1103515245 + 12345) & 0x7fffffff; return _s / 0x7fffffff; };
for (let i = COMBOS.length - 1; i > 0; i--) { const j = Math.floor(_rnd() * (i + 1)); const t = COMBOS[i]; COMBOS[i] = COMBOS[j]; COMBOS[j] = t; }
let nameIdx = 0;
function uniqueName() { return COMBOS[nameIdx++ % COMBOS.length]; }

MOTIONS.forEach((m, mi) => {
  for (let k = 0; k < PER_BASE; k++) {
    const i = mi * PER_BASE + k;
    const content = makeContent(m, i);
    const itemKey = m.id + '|' + JSON.stringify(content);
    if (seenItem.has(itemKey)) continue;     // skip exact-content repeats
    seenItem.add(itemKey);
    const pack = PACKS[i % PACKS.length];
    const bg = DARK_BGS[(mi + k) % DARK_BGS.length];
    const font = FONTS_P[(mi * 2 + k) % FONTS_P.length];
    const props = { ...m.defaults, ...content };
    // re-theme colour fields only (keep contrast-critical defaults)
    m.fields.forEach(f => {
      if (f.type === 'color') {
        if (f.key === 'accent') props.accent = pack.accent;
        else if (f.key === 'c2') props.c2 = pack.c2;
        else if (f.key === 'c3') props.c3 = pack.c3;
      } else if (f.type === 'bg') props.bg = bg;
    });
    props._font = font;
    props._upper = (k % 5 === 4);
    props._scale = 1;
    CATALOG.push({
      id: m.id + '-' + k,
      name: uniqueName(),
      cat: m.cat,
      base: m.name,
      motion: m,
      format: m.format,
      speed: 0.85 + ((i % 5) * 0.12),
      props,
    });
  }
});

const PAGE_SIZES = [10, 50, 100, 1000];

export { CATALOG, PAGE_SIZES };

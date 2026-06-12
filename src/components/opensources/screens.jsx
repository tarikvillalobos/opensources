"use client";
// screens.jsx — Home, Components gallery, Editor.
import React, { useState, useEffect } from "react";
import { MOTIONS, CATS, CAT_LABEL, TEXT_COLORS, BG_COLORS, FONTS, FONT_OPTS, Stage } from "./motions";
import { CATALOG, PAGE_SIZES } from "./presets";

/* ---- icon set -------------------------------------------------------- */
const ICONS = {
  logo: <path d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4M3 17l9 4 9-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>,
  search: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></g>,
  sun: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/></g>,
  moon: <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  plus: <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>,
  code: <path d="M8 6l-5 6 5 6M16 6l5 6-5 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  copy: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 012-2h10"/></g>,
  film: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 15h18M8 4v16M16 4v16"/></g>,
  gif: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 12h-2v-1h2"/></g>,
  check: <path d="M4 12l5 5L20 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>,
  close: <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>,
  reset: <path d="M3 12a9 9 0 109-9 9 9 0 00-7 3.3M3 3v4h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  download: <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 20h16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  sq: <rect x="5" y="5" width="14" height="14" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8"/>,
  port: <rect x="7" y="4" width="10" height="16" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8"/>,
  story: <rect x="8.5" y="3" width="7" height="18" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8"/>,
  wide: <rect x="3" y="7" width="18" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8"/>,
  spark: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>,
  heart: <path d="M12 20s-7-4.5-9.2-8.2C1.2 9 2.5 5.5 6 5.5c2 0 3.2 1.3 4 2.5.8-1.2 2-2.5 4-2.5 3.5 0 4.8 3.5 3.2 6.3C19 15.5 12 20 12 20z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>,
};
function Icon({ k, size, style }) {
  return <svg viewBox="0 0 24 24" width={size||18} height={size||18} style={{ display: 'block', ...style }}>{ICONS[k]}</svg>;
}
const Ticks = () => <><span className="tick tl"/><span className="tick tr"/><span className="tick bl"/><span className="tick br"/></>;

/* ---- a gallery / featured card --------------------------------------- */
function MotionCard({ item, onOpen }) {
  return (
    <div className="card" onClick={() => onOpen(item)} role="button" tabIndex={0}
      onKeyDown={(e)=>{ if(e.key==='Enter') onOpen(item); }}>
      <Stage motion={item.motion} props={item.props} speed={item.speed || 1} format="square" />
      <div className="card-foot">
        <div className="meta">
          <div className="card-title">{item.name}</div>
          <div className="card-cat">{CAT_LABEL[item.cat]}</div>
        </div>
        <div className="spacer" />
        <div className="card-go"><Icon k="arrow" size={15} /></div>
      </div>
      <div className="card-hover-bar" />
    </div>
  );
}

/* ===================================================================== *
   HOME
 * ===================================================================== */
function Home({ onOpen, onNav }) {
  const featured = ['word-rise', 'count-up', 'quote-mark', 'marquee', 'caption-bar', 'pulse-badge']
    .map(id => { const m = MOTIONS.find(x => x.id === id); return { id: m.id, name: m.name, cat: m.cat, motion: m, props: m.defaults, format: m.format }; });
  const steps = [
    { k: 'spark', t: 'Escolha', d: 'Navegue pela biblioteca de motions tipográficos prontos para usar.' },
    { k: 'code',  t: 'Edite',  d: 'Troque as palavras, cores e a velocidade — o design continua intacto.' },
    { k: 'download', t: 'Exporte', d: 'Baixe como vídeo ou GIF, ou copie o código para o seu projeto.' },
  ];
  const heroMotion = MOTIONS.find(m => m.id === 'word-swap');
  return (
    <div className="page fade-in">
      {/* hero */}
      <section className="hero wrap frame">
        <Ticks />
        <div className="hero-grid">
          <div>
            <div className="eyebrow">Biblioteca aberta · {CATALOG.length} componentes</div>
            <h1>Componentes em <em>motion</em> para copiar, editar e postar.</h1>
            <p>O OpenSources é como o shadcn/ui — mas cada componente é uma animação tipográfica.
              Edite o texto, mantenha o design e exporte como vídeo, GIF ou código.</p>
            <div className="hero-cta">
              <button className="btn accent" onClick={() => onNav('components')}>Explorar componentes <Icon k="arrow" size={15} /></button>
              <button className="btn ghost" onClick={() => onOpen(MOTIONS[0])}>Abrir o editor</button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><div className="n">{CATALOG.length}</div><div className="l">componentes</div></div>
              <div className="hero-stat"><div className="n">{CATS.length - 1}</div><div className="l">categorias</div></div>
              <div className="hero-stat"><div className="n">MIT</div><div className="l">licença aberta</div></div>
            </div>
          </div>
          <div className="hero-visual frame" onClick={() => onOpen(heroMotion)} role="button" tabIndex={0}>
            <Ticks />
            <Stage motion={heroMotion} props={heroMotion.defaults} speed={1} format="square" />
            <div className="hero-visual-tag mono">word-swap.tsx</div>
          </div>
        </div>
      </section>

      {/* featured */}
      <section className="wrap" style={{ marginTop: 64 }}>
        <div className="section-head">
          <div className="eyebrow" style={{ marginBottom: 6 }}>Em destaque</div>
          <h2 style={{ position: 'absolute', left: -9999 }}>Em destaque</h2>
          <div className="spacer" />
          <a onClick={() => onNav('components')} style={{ cursor: 'pointer' }}>Ver todos <Icon k="arrow" size={14} /></a>
        </div>
        <div className="grid cols-3">
          {featured.map(it => <MotionCard key={it.id} item={it} onOpen={onOpen} />)}
        </div>
      </section>

      {/* how it works */}
      <section className="wrap" style={{ marginTop: 70 }}>
        <div className="frame" style={{ border: '1px solid var(--border)', borderRadius: 14, padding: '34px 30px', background: 'var(--bg-1)' }}>
          <Ticks />
          <div className="eyebrow" style={{ marginBottom: 22 }}>Como funciona</div>
          <div className="grid cols-3" style={{ gap: 26 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 14 }}>
                <div style={{ width: 38, height: 38, flexShrink: 0, borderRadius: 9, border: '1px solid var(--border)',
                  display: 'grid', placeItems: 'center', color: 'var(--accent)', background: 'var(--bg)' }}>
                  <Icon k={s.k} size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 560, fontSize: 15, letterSpacing: '-.01em', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="mono" style={{ fontSize: 12, color: 'var(--faint)' }}>0{i+1}</span>{s.t}
                  </div>
                  <div style={{ fontSize: 13.5, color: 'var(--dim)', marginTop: 5, lineHeight: 1.5 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===================================================================== *
   COMPONENTS GALLERY
 * ===================================================================== */
function Components({ onOpen, query }) {
  const [cat, setCat] = useState('all');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const q = (query || '').toLowerCase().trim();
  const list = CATALOG.filter(it =>
    (cat === 'all' || it.cat === cat) &&
    (!q || it.name.toLowerCase().includes(q) || it.base.toLowerCase().includes(q) || CAT_LABEL[it.cat].toLowerCase().includes(q)));
  useEffect(() => { setPage(0); }, [cat, q, pageSize]);
  const pages = Math.max(1, Math.ceil(list.length / pageSize));
  const p = Math.min(page, pages - 1);
  const slice = list.slice(p * pageSize, p * pageSize + pageSize);
  const go = (n) => { setPage(n); window.scrollTo(0, 0); };
  return (
    <div className="page fade-in wrap" style={{ paddingTop: 40 }}>
      <div className="frame" style={{ marginBottom: 26 }}>
        <Ticks />
        <div className="eyebrow">Biblioteca</div>
        <h1 style={{ fontSize: 'clamp(30px,4vw,44px)', letterSpacing: '-.035em', fontWeight: 600, margin: '12px 0 0' }}>Componentes</h1>
        <p style={{ color: 'var(--dim)', fontSize: 15.5, margin: '12px 0 0', maxWidth: '56ch', lineHeight: 1.5 }}>
          {CATALOG.length.toLocaleString('pt-BR')} componentes únicos — cada um com nome, conteúdo e tema próprios. Clique em qualquer um para abrir no editor, ajustar e exportar.
        </p>
      </div>

      <div className="cat-row" style={{ marginBottom: 22, position: 'sticky', top: 'calc(var(--nav-h))', zIndex: 20,
        paddingTop: 6, paddingBottom: 14, background: 'linear-gradient(var(--bg) 70%, transparent)' }}>
        {CATS.map(c => (
          <button key={c.id} className={'pill' + (cat === c.id ? ' on' : '')} onClick={() => setCat(c.id)}>
            {c.label}
            <span className="mono" style={{ fontSize: 11, opacity: .6 }}>
              {c.id === 'all' ? CATALOG.length : CATALOG.filter(it => it.cat === c.id).length}
            </span>
          </button>
        ))}
      </div>

      {list.length ? (
        <>
          <div className="gallery-bar">
            <span className="mono" style={{ fontSize: 12, color: 'var(--dim)' }}>
              {list.length.toLocaleString('pt-BR')} componentes
            </span>
            <span className="spacer" style={{ flex: 1 }} />
            <span className="mono" style={{ fontSize: 11, color: 'var(--faint)' }}>mostrar</span>
            <div className="size-group">
              {PAGE_SIZES.map(s => (
                <button key={s} className={'size-btn' + (pageSize === s ? ' on' : '')} onClick={() => setPageSize(s)}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid cols-4">
            {slice.map(it => <MotionCard key={it.id} item={it} onOpen={onOpen} />)}
          </div>
          {pages > 1 && (
            <div className="pager">
              <button className="btn sm ghost" disabled={p === 0} onClick={() => go(p - 1)}>
                <Icon k="arrow" size={14} style={{ transform: 'rotate(180deg)' }} /> Anterior
              </button>
              <div className="pager-nums">
                {Array.from({ length: pages }).map((_, i) => i).filter(i =>
                  i === 0 || i === pages - 1 || Math.abs(i - p) <= 1).reduce((acc, i, idx, arr) => {
                    if (idx > 0 && i - arr[idx - 1] > 1) acc.push('gap' + i);
                    acc.push(i); return acc;
                  }, []).map((i, k) => typeof i === 'string'
                    ? <span key={k} className="pager-gap">…</span>
                    : <button key={k} className={'pager-n' + (i === p ? ' on' : '')} onClick={() => go(i)}>{i + 1}</button>)}
              </div>
              <button className="btn sm ghost" disabled={p >= pages - 1} onClick={() => go(p + 1)}>
                Próxima <Icon k="arrow" size={14} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '70px 0', color: 'var(--dim)' }}>
          <div className="mono" style={{ fontSize: 13 }}>nenhum componente para “{query}”.</div>
        </div>
      )}
    </div>
  );
}

/* ===================================================================== *
   EDITOR  (Create)
 * ===================================================================== */
const FORMATS = [['square','sq'],['portrait','port'],['story','story'],['wide','wide']];

function ColorField({ value, onChange }) {
  return (
    <div className="swatches">
      {TEXT_COLORS.map(c => (
        <button key={c} className={'swatch' + (value === c ? ' on' : '')} style={{ background: c }}
          onClick={() => onChange(c)} aria-label={c} />
      ))}
    </div>
  );
}
function BgField({ value, onChange }) {
  return (
    <div className="swatches">
      {BG_COLORS.map(c => (
        <button key={c} className={'swatch' + (value === c ? ' on' : '')} style={{ background: c }}
          onClick={() => onChange(c)} aria-label={c} />
      ))}
    </div>
  );
}

function Editor({ item, onExport, onCode, onBack }) {
  const motion = item.motion;
  const [props, setProps] = useState({ _font: 'geist', _upper: false, _scale: 1, ...item.props });
  const [speed, setSpeed] = useState(item.speed || 1);
  const [format, setFormat] = useState(item.format || motion.format);
  const set = (k, v) => setProps(p => ({ ...p, [k]: v }));
  const reset = () => { setProps({ _font: 'geist', _upper: false, _scale: 1, ...item.props }); setSpeed(item.speed || 1); setFormat(item.format || motion.format); };

  return (
    <div className="editor fade-in">
      {/* canvas */}
      <div className="ed-canvas">
        <div className="ed-toolbar">
          <button className="btn sm ghost" onClick={onBack}><Icon k="arrow" size={14} style={{ transform: 'rotate(180deg)' }} /> Voltar</button>
          <div className="spacer" />
          <div className="fmt-group">
            {FORMATS.map(([f, ic]) => (
              <button key={f} className={format === f ? 'on' : ''} onClick={() => setFormat(f)} title={f}><Icon k={ic} size={15} /></button>
            ))}
          </div>
          <button className="icon-btn" onClick={reset} title="Resetar"><Icon k="reset" size={15} /></button>
        </div>
        <div className="ed-stage-wrap frame">
          <Ticks />
          <Stage motion={motion} props={props} speed={speed} format={format} />
        </div>
      </div>

      {/* panel */}
      <aside className="ed-panel">
        <div className="ed-panel-head">
          <div className="nm">{item.name}</div>
          <div className="cat">{CAT_LABEL[motion.cat]} · {motion.name}</div>
        </div>
        <div className="ed-fields">
          {motion.fields.map(f => (
            <div className="field" key={f.key}>
              <label>{f.label}</label>
              {f.type === 'text' && <input type="text" value={props[f.key] ?? ''} onChange={e => set(f.key, e.target.value)} />}
              {f.type === 'area' && <textarea rows={2} value={props[f.key] ?? ''} onChange={e => set(f.key, e.target.value)} />}
              {f.type === 'color' && <ColorField value={props[f.key]} onChange={v => set(f.key, v)} />}
              {f.type === 'bg' && <BgField value={props[f.key]} onChange={v => set(f.key, v)} />}
              {motion.rich && (f.type === 'text' || f.type === 'area') && (f.key === 'text') && (
                <div className="field-hint">Envolva com <code>*palavra*</code> para destacar · <kbd>↵</kbd> nova linha</div>
              )}
            </div>
          ))}

          <div className="ed-section">Tipografia &amp; formato</div>
          <div className="field">
            <label>Fonte</label>
            <div className="font-chips">
              {FONT_OPTS.map(([key, lbl]) => (
                <button key={key} className={'font-chip' + (props._font === key ? ' on' : '')}
                  style={{ fontFamily: FONTS[key] }} onClick={() => set('_font', key)}>{lbl}</button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Tamanho</label>
            <div className="range-row">
              <input className="range" type="range" min="0.6" max="1.4" step="0.05" value={props._scale ?? 1}
                onChange={e => set('_scale', +e.target.value)} />
              <span className="val">{Math.round((props._scale ?? 1) * 100)}%</span>
            </div>
          </div>
          <div className="field">
            <div className="toggle-row">
              <button className={'switch' + (props._upper ? ' on' : '')} onClick={() => set('_upper', !props._upper)} aria-label="Caixa alta"><i /></button>
              <span className="toggle-label">Caixa alta</span>
            </div>
          </div>

          <div className="ed-section">Animação</div>
          <div className="field">
            <label>Velocidade</label>
            <div className="range-row">
              <input className="range" type="range" min="0.5" max="2" step="0.1" value={speed}
                onChange={e => setSpeed(+e.target.value)} />
              <span className="val">{speed.toFixed(1)}×</span>
            </div>
          </div>
        </div>
        <div className="ed-export">
          <div className="row">
            <button className="btn" onClick={() => onExport('mp4', motion)}><Icon k="film" size={15} /> MP4</button>
            <button className="btn" onClick={() => onExport('gif', motion)}><Icon k="gif" size={15} /> GIF</button>
          </div>
          <button className="btn primary" style={{ justifyContent: 'center' }} onClick={() => onCode(motion, props, speed, format)}>
            <Icon k="code" size={15} /> Copiar código
          </button>
        </div>
      </aside>
    </div>
  );
}

export { Icon, ICONS, Ticks, MotionCard, Home, Components, Editor };

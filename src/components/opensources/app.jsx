"use client";
// app.jsx — OpenSources root: routing, theme, search, toasts, export & code modals.
import React, { useState, useEffect } from "react";
import { MOTIONS } from "./motions";
import { Icon, ICONS, Home, Components, Editor } from "./screens";

const ACCENT = '#c8ff2d';

/* ---- code snippet ---------------------------------------------------- */
function snippetFor(motion, props, speed, format) {
  const Comp = motion.name.replace(/\s+/g, '');
  const attrs = motion.fields.map(f => {
    const v = props[f.key];
    return `  ${f.key}=${JSON.stringify(v ?? '')}`;
  }).join('\n');
  return `# add the component\nnpx opensources@latest add ${motion.id}\n\n# use it\nimport { ${Comp} } from "@/components/motions"\n\n<${Comp}\n${attrs}\n  font="${props._font || 'geist'}"\n  uppercase={${!!props._upper}}\n  scale={${props._scale ?? 1}}\n  speed={${speed}}\n  format="${format}"\n/>`;
}

/* ===================================================================== *
   APP
 * ===================================================================== */
export default function App() {
  const [view, setView] = useState('home');            // home | components | create
  const [sel, setSel] = useState(null);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState('dark');
  const [toasts, setToasts] = useState([]);
  const [code, setCode] = useState(null);              // {text, title}
  const [exp, setExp] = useState(null);                // {fmt, pct, name}

  // theme (restore saved preference after mount, then persist)
  useEffect(() => {
    const saved = localStorage.getItem('os-theme');
    if (saved) setTheme(saved);
  }, []);
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('os-theme', theme); }, [theme]);
  // accent → css
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--accent', ACCENT);
    r.style.setProperty('--accent-ink', '#0a0a0a');
  }, []);

  const toast = (msg, icon = 'check') => {
    const id = Math.random();
    setToasts(ts => [...ts, { id, msg, icon }]);
    setTimeout(() => setToasts(ts => ts.filter(x => x.id !== id)), 2600);
  };

  const open = (x) => {
    const it = x && x.motion ? x : { id: x.id, name: x.name, cat: x.cat, motion: x, props: { ...x.defaults }, format: x.format };
    setSel(it); setView('create'); window.scrollTo(0, 0);
  };
  const nav = (v) => { setView(v); setQuery(''); window.scrollTo(0, 0); };

  const onSearch = (val) => { setQuery(val); if (val && view !== 'components') setView('components'); };

  // export simulation
  const doExport = (fmt, m) => {
    setExp({ fmt, pct: 0, name: m.name });
    let pct = 0;
    const id = setInterval(() => {
      pct += Math.random() * 16 + 6;
      if (pct >= 100) {
        clearInterval(id); setExp({ fmt, pct: 100, name: m.name });
        setTimeout(() => { setExp(null); toast(`${m.name}.${fmt} baixado`, 'download'); }, 420);
      } else setExp({ fmt, pct, name: m.name });
    }, 180);
  };
  const showCode = (m, props, speed, format) => setCode({ title: m.name, text: snippetFor(m, props, speed, format) });
  const copyCode = () => {
    try { navigator.clipboard.writeText(code.text); } catch (e) {}
    toast('Código copiado', 'copy'); setCode(null);
  };

  return (
    <div className="app">
      <div className="rails" />
      {/* nav */}
      <nav className="nav">
        <div className="wrap">
          <div className="brand" onClick={() => nav('home')} style={{ cursor: 'pointer' }}>
            <span className="logo"><svg viewBox="0 0 24 24" width="14" height="14">{ICONS.logo}</svg></span>
            OpenSources
          </div>
          <div className="nav-links">
            <a className={view === 'home' ? 'active' : ''} onClick={() => nav('home')}>Home</a>
            <a className={view === 'components' ? 'active' : ''} onClick={() => nav('components')}>Componentes</a>
            <a className={view === 'create' ? 'active' : ''} onClick={() => open(sel || MOTIONS[0])}>Create</a>
          </div>
          <div className="nav-spacer" />
          <div className="nav-right">
            <div className="search">
              <Icon k="search" size={15} />
              <input placeholder="Buscar componentes…" value={query} onChange={e => onSearch(e.target.value)} />
              <kbd>/</kbd>
            </div>
            <button className="icon-btn" onClick={() => setTheme(th => th === 'dark' ? 'light' : 'dark')} title="Tema">
              <Icon k={theme === 'dark' ? 'sun' : 'moon'} size={16} />
            </button>
            <button className="btn accent sm" onClick={() => open(MOTIONS[0])}><Icon k="plus" size={15} /> Create</button>
          </div>
        </div>
      </nav>

      {/* routes */}
      {view === 'home' && <Home onOpen={open} onNav={nav} />}
      {view === 'components' && <Components onOpen={open} query={query} />}
      {view === 'create' && sel && <Editor item={sel} onExport={doExport} onCode={showCode} onBack={() => nav('components')} />}

      {/* footer (not on editor) */}
      {view !== 'create' && (
        <footer className="foot">
          <div className="wrap">
            <span className="brand" style={{ fontSize: 14 }}>
              <span className="logo"><svg viewBox="0 0 24 24" width="14" height="14">{ICONS.logo}</svg></span>OpenSources
            </span>
            <span className="spacer" />
            <span className="mono" style={{ fontSize: 12, color: 'var(--faint)' }}>open · MIT · {new Date().getFullYear()}</span>
          </div>
        </footer>
      )}

      {/* code modal */}
      {code && (
        <div className="scrim" onClick={() => setCode(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <Icon k="code" size={16} />
              <span className="nm">{code.title}</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--faint)' }}>npx opensources add</span>
              <span className="spacer" />
              <button className="icon-btn" onClick={() => setCode(null)}><Icon k="close" size={15} /></button>
            </div>
            <pre className="code">{code.text}</pre>
            <div style={{ display: 'flex', gap: 8, padding: '12px 18px', borderTop: '1px solid var(--border)' }}>
              <span className="spacer" style={{ flex: 1 }} />
              <button className="btn sm ghost" onClick={() => setCode(null)}>Fechar</button>
              <button className="btn sm accent" onClick={copyCode}><Icon k="copy" size={14} /> Copiar</button>
            </div>
          </div>
        </div>
      )}

      {/* export progress */}
      {exp && (
        <div className="scrim">
          <div className="modal" style={{ width: 'min(380px,100%)', padding: '22px 22px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon k={exp.fmt === 'gif' ? 'gif' : 'film'} size={18} />
              <span className="nm" style={{ fontWeight: 560 }}>Renderizando {exp.fmt.toUpperCase()}</span>
              <span className="spacer" style={{ flex: 1 }} />
              <span className="mono" style={{ fontSize: 12, color: 'var(--dim)' }}>{Math.min(100, Math.round(exp.pct))}%</span>
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--dim)', margin: '8px 0 14px' }}>{exp.name} · 1080×1080 · 30fps</div>
            <div className="toast-prog"><i style={{ width: Math.min(100, exp.pct) + '%' }} /></div>
          </div>
        </div>
      )}

      {/* toasts */}
      <div className="toast-wrap">
        {toasts.map(t => (
          <div className="toast" key={t.id}>
            <span className="ic"><Icon k={t.icon} size={16} /></span>{t.msg}
          </div>
        ))}
      </div>
    </div>
  );
}

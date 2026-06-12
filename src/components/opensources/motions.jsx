"use client";
// motions.jsx — OpenSources live motion library.
// Each motion renders inside a container-query .stage and scales by cqmin units,
// so the SAME component looks right in a 200px card and a 560px editor.
// Driven entirely by props (text / color / bg / speed).
import React, { useState, useEffect } from "react";

/* ---- timing helpers -------------------------------------------------- */
function useLoop(durSec) {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf, start = performance.now();
    const tick = (now) => { setT((((now - start) / 1000) / durSec) % 1); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durSec]);
  return t;
}
function useStep(count, stepSec) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % count), Math.max(120, stepSec * 1000));
    return () => clearInterval(id);
  }, [count, stepSec]);
  return i;
}
const easeOut = (x) => 1 - Math.pow(1 - x, 3);
const fmtNum = (n) => Math.round(n).toLocaleString('en-US');

/* ---- rich text: *word* -> accent color, \n -> line break ------------- */
function rich(text, accent) {
  return String(text ?? '').split('\n').map((line, li) => (
    <React.Fragment key={li}>
      {li > 0 && <br />}
      {line.split(/(\*[^*]+\*)/g).map((part, pi) =>
        part.length > 2 && part.startsWith('*') && part.endsWith('*')
          ? <span key={pi} style={{ color: accent }}>{part.slice(1, -1)}</span>
          : <React.Fragment key={pi}>{part}</React.Fragment>
      )}
    </React.Fragment>
  ));
}

/* ---- font options exposed to the editor ------------------------------ */
const FONTS = {
  geist:     "'Geist', system-ui, sans-serif",
  grotesk:   "'Space Grotesk', sans-serif",
  condensed: "'Bebas Neue', sans-serif",
  serif:     "'Instrument Serif', Georgia, serif",
  mono:      "'Geist Mono', monospace",
};
const FONT_OPTS = [['geist','Geométrica'], ['grotesk','Grotesk'], ['condensed','Condensada'], ['serif','Serifada'], ['mono','Mono']];

/* ---- palettes shared by the editor ----------------------------------- */
const TEXT_COLORS = ['#ffffff', '#0a0a0a', '#c8ff2d', '#ff5c35', '#5b8cff', '#19c37d', '#ff4d8d', '#ffd23f'];
const BG_COLORS   = ['#0a0a0a', '#111317', '#ffffff', '#f3f3f5', '#c8ff2d', '#191535', '#06281f', '#2a0f12'];

/* ===================================================================== *
   MOTIONS
 * ===================================================================== */

// 1 — Word Rise (kinetic)
function WordRise({ p, dur }) {
  const accent = p.accent || p.color;
  const lines = String(p.text || '').split('\n');
  let idx = 0;
  return (
    <div className="m-center" style={{ alignContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.08em', alignItems: 'center',
        fontWeight: 600, fontSize: '13cqmin', lineHeight: 1.02, letterSpacing: '-.03em',
        color: p.color, textAlign: 'center' }}>
        {lines.map((line, li) => {
          let hl = false;
          return (
            <div key={li} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 .28em' }}>
              {line.split(/\s+/).filter(Boolean).map((tok, wi) => {
                let word = tok; const start = word.startsWith('*'); const end = word.endsWith('*');
                if (start) { word = word.slice(1); hl = true; }
                const thisHi = hl;
                if (end) word = word.slice(0, -1);
                const delay = (idx++ * dur * 0.06).toFixed(2);
                const node = (
                  <span key={wi} style={{ overflow: 'hidden', display: 'inline-block', paddingBottom: '.06em' }}>
                    <span style={{ display: 'inline-block', color: thisHi ? accent : 'inherit',
                      animation: `kWordUp ${dur}s var(--ease) ${delay}s infinite both` }}>{word}</span>
                  </span>
                );
                if (end) hl = false;
                return node;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 2 — Punch In (kinetic)
function PunchIn({ p, dur }) {
  return (
    <div className="m-center">
      <div style={{ fontWeight: 680, fontSize: '17cqmin', lineHeight: .96, letterSpacing: '-.04em',
        color: p.color, textAlign: 'center', animation: `kPunch ${dur}s var(--ease) infinite both` }}>
        {rich(p.text, p.accent || p.color)}
      </div>
    </div>
  );
}

// 3 — Word Swap (kinetic)
function WordSwap({ p, dur }) {
  const opts = String(p.words || '').split(',').map(s => s.trim()).filter(Boolean);
  const i = useStep(opts.length || 1, dur * 0.55);
  return (
    <div className="m-center">
      <div style={{ fontWeight: 600, fontSize: '11cqmin', lineHeight: 1.1, letterSpacing: '-.02em',
        color: p.color, textAlign: 'center', maxWidth: '86cqw' }}>
        {p.pre}{' '}
        <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', position: 'relative' }}>
          <span key={i} style={{ display: 'inline-block', color: p.accent,
            animation: `kSwap ${dur * 0.55}s var(--ease) both` }}>{opts[i % (opts.length || 1)]}</span>
        </span>{' '}{p.post}
      </div>
    </div>
  );
}

// 4 — Scramble (kinetic)
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*0123456789';
function Scramble({ p, dur }) {
  const t = useLoop(dur);
  const txt = String(p.text || '');
  const reveal = t < .55 ? easeOut(t / .55) : (t < .9 ? 1 : 0);
  const shown = txt.split('').map((ch, i) => {
    if (ch === ' ') return ' ';
    const threshold = (i + 1) / txt.length;
    if (reveal >= threshold) return ch;
    if (reveal <= 0) return ' ';
    return GLYPHS[(Math.floor(t * 90) + i * 7) % GLYPHS.length];
  }).join('');
  return (
    <div className="m-center">
      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '11cqmin',
        letterSpacing: '-.01em', color: p.color, textAlign: 'center', lineHeight: 1.1 }}>
        {shown}<span style={{ color: p.accent, animation: 'kBlink 1s step-end infinite' }}>_</span>
      </div>
    </div>
  );
}

// 5 — Caption Bar (lower-third)
function CaptionBar({ p, dur }) {
  return (
    <div className="m-center" style={{ alignContent: 'end', justifyItems: 'start', padding: '9cqmin' }}>
      <div style={{ display: 'inline-flex', alignItems: 'stretch', overflow: 'hidden' }}>
        <div style={{ width: '1.4cqmin', background: p.accent, marginRight: '2.4cqmin',
          animation: `kBarIn ${dur}s var(--ease) infinite both` }} />
        <div style={{ animation: `kBarText ${dur}s var(--ease) infinite both` }}>
          <div style={{ fontWeight: 640, fontSize: '7.4cqmin', letterSpacing: '-.02em', color: p.color, lineHeight: 1.05 }}>{p.name}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '3.5cqmin', letterSpacing: '.06em',
            textTransform: 'uppercase', color: p.accent, marginTop: '1.4cqmin' }}>{p.role}</div>
        </div>
      </div>
    </div>
  );
}

// 6 — Tag Pop (lower-third)
function TagPop({ p, dur }) {
  return (
    <div className="m-center" style={{ alignContent: 'end', padding: '11cqmin' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '2cqmin', padding: '2.6cqmin 4.4cqmin',
        borderRadius: '999px', background: p.accent, color: p.color, fontWeight: 600, fontSize: '5.6cqmin',
        letterSpacing: '-.01em', animation: `kPop ${dur}s var(--ease) infinite both`, boxShadow: '0 4cqmin 10cqmin -4cqmin rgba(0,0,0,.5)' }}>
        <span style={{ width: '2.4cqmin', height: '2.4cqmin', borderRadius: '50%', background: 'currentColor', opacity: .85 }} />
        {p.text}
      </div>
    </div>
  );
}

// 7 — Quote Mark (quote)
function QuoteMark({ p, dur }) {
  return (
    <div className="m-center" style={{ alignContent: 'center', padding: '10cqmin' }}>
      <div style={{ fontFamily: 'Georgia, serif', fontSize: '34cqmin', lineHeight: .6, color: p.accent,
        height: '12cqmin', animation: `kQuoteMark ${dur}s var(--ease) infinite both` }}>“</div>
      <div style={{ fontWeight: 560, fontSize: '8.4cqmin', lineHeight: 1.18, letterSpacing: '-.02em',
        color: p.color, textAlign: 'center', maxWidth: '82cqw', margin: '4cqmin auto 0',
        animation: `kFadeUp ${dur}s var(--ease) infinite both` }}>{rich(p.text, p.accent)}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '3.6cqmin', letterSpacing: '.08em',
        textTransform: 'uppercase', color: p.accent, textAlign: 'center', marginTop: '4cqmin',
        animation: `kFadeUp ${dur}s var(--ease) ${(dur*0.08).toFixed(2)}s infinite both` }}>— {p.by}</div>
    </div>
  );
}

// 8 — Testimonial (quote)
function Testimonial({ p, dur }) {
  return (
    <div className="m-center" style={{ alignContent: 'center', padding: '9cqmin' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.4cqmin', marginBottom: '4cqmin' }}>
        {[0,1,2,3,4].map(i => (
          <svg key={i} viewBox="0 0 24 24" width="6cqmin" height="6cqmin" fill={p.accent}
            style={{ animation: `kStar ${dur}s var(--ease) ${(i * dur * 0.05).toFixed(2)}s infinite both` }}>
            <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5 20.4l1.4-6.8L1.3 9l6.9-.8z"/>
          </svg>
        ))}
      </div>
      <div style={{ fontWeight: 540, fontSize: '6.6cqmin', lineHeight: 1.25, letterSpacing: '-.02em',
        color: p.color, textAlign: 'center', maxWidth: '80cqw', margin: '0 auto',
        animation: `kFadeUp ${dur}s var(--ease) infinite both` }}>{rich(p.text, p.accent)}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2.4cqmin', marginTop: '5cqmin',
        animation: `kFadeUp ${dur}s var(--ease) ${(dur*0.1).toFixed(2)}s infinite both` }}>
        <div style={{ width: '7cqmin', height: '7cqmin', borderRadius: '50%', background: p.accent, color: '#0a0a0a',
          display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: '3.6cqmin' }}>{(p.by||'?').charAt(0)}</div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontWeight: 600, fontSize: '3.8cqmin', color: p.color }}>{p.by}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.9cqmin', color: p.accent }}>{p.role}</div>
        </div>
      </div>
    </div>
  );
}

// 9 — Count Up (counter)
function CountUp({ p, dur }) {
  const t = useLoop(dur);
  const target = parseFloat(p.value) || 0;
  const prog = t < .6 ? easeOut(t / .6) : 1;
  const val = target * prog;
  return (
    <div className="m-center">
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', color: p.color,
          fontWeight: 700, letterSpacing: '-.04em', lineHeight: .9 }}>
          <span style={{ fontSize: '7cqmin', color: p.accent, marginRight: '1cqmin' }}>{p.prefix}</span>
          <span style={{ fontSize: '24cqmin', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-mono)' }}>{fmtNum(val)}</span>
          <span style={{ fontSize: '10cqmin', color: p.accent, marginLeft: '1cqmin' }}>{p.suffix}</span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '4cqmin', letterSpacing: '.1em',
          textTransform: 'uppercase', color: p.color, opacity: .7, marginTop: '3cqmin' }}>{p.label}</div>
      </div>
    </div>
  );
}

// 10 — Stat Bars (counter)
function StatBars({ p, dur }) {
  const t = useLoop(dur);
  const prog = t < .55 ? easeOut(t / .55) : 1;
  const rows = [[p.l1, +p.v1 || 0], [p.l2, +p.v2 || 0], [p.l3, +p.v3 || 0]];
  return (
    <div className="m-center" style={{ alignContent: 'center', padding: '11cqmin' }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '5cqmin' }}>
        {rows.map(([label, v], i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.8cqmin', color: p.color }}>
              <span style={{ fontSize: '4.4cqmin', fontWeight: 540 }}>{label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '4.4cqmin', fontWeight: 600 }}>{Math.round(v * prog)}%</span>
            </div>
            <div style={{ height: '3.2cqmin', borderRadius: '999px', background: 'rgba(128,128,128,.22)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: (v * prog) + '%', borderRadius: '999px',
                background: i === 0 ? p.accent : p.color, opacity: i === 0 ? 1 : .55 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 11 — Mesh Flow (background)
function MeshFlow({ p, dur }) {
  const blob = (anim, color, x, y, s) => (
    <div style={{ position: 'absolute', left: x, top: y, width: s, height: s, borderRadius: '50%',
      background: color, filter: 'blur(14cqmin)', animation: `${anim} ${dur*2}s ease-in-out infinite` }} />
  );
  return (
    <div className="m-center" style={{ overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: '-20%' }}>
        {blob('kMesh1', p.accent, '5%', '8%', '55cqmin')}
        {blob('kMesh2', p.c2, '50%', '40%', '60cqmin')}
        {blob('kMesh3', p.c3, '20%', '55%', '50cqmin')}
      </div>
      <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(2cqmin)' }} />
      <div style={{ position: 'relative', fontWeight: 680, fontSize: '14cqmin', lineHeight: .98,
        letterSpacing: '-.04em', color: p.color, textAlign: 'center', mixBlendMode: 'overlay', padding: '8cqmin' }}>{p.text}</div>
      <div style={{ position: 'absolute', fontWeight: 680, fontSize: '14cqmin', lineHeight: .98,
        letterSpacing: '-.04em', color: p.color, textAlign: 'center', padding: '8cqmin', opacity: .9 }}>{p.text}</div>
    </div>
  );
}

// 12 — Marquee (background)
function Marquee({ p, dur }) {
  const band = (text, anim, bg, fg, rot) => (
    <div style={{ transform: `rotate(${rot}deg)`, width: '140%', marginLeft: '-20%', background: bg,
      padding: '2.4cqmin 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <div style={{ display: 'inline-flex', animation: `${anim} ${dur*2.4}s linear infinite` }}>
        {[0,1].map(k => (
          <span key={k} style={{ fontWeight: 720, fontSize: '8.6cqmin', letterSpacing: '-.02em', color: fg, paddingRight: '4cqmin' }}>
            {Array(4).fill(text).map((s, j) => <span key={j} style={{ paddingRight: '4cqmin' }}>{s} ✦</span>)}
          </span>
        ))}
      </div>
    </div>
  );
  return (
    <div className="m-center" style={{ alignContent: 'center', gap: '3cqmin', overflow: 'hidden' }}>
      {band(p.text, 'kMarqL', p.accent, '#0a0a0a', -4)}
      {band(p.text2, 'kMarqR', 'transparent', p.color, 4)}
    </div>
  );
}

// 13 — Pulse Badge (badge)
function PulseBadge({ p, dur }) {
  const ring = (d) => (
    <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1cqmin solid ${p.accent}`,
      animation: `kPulseRing ${dur}s ease-out ${d}s infinite` }} />
  );
  return (
    <div className="m-center">
      <div style={{ position: 'relative', width: '40cqmin', height: '40cqmin', display: 'grid', placeItems: 'center' }}>
        {ring(0)}{ring(dur * 0.5)}
        <div style={{ width: '40cqmin', height: '40cqmin', borderRadius: '50%', background: p.accent,
          color: p.color, display: 'grid', placeItems: 'center', textAlign: 'center', lineHeight: 1,
          animation: `kBadgeIn ${dur}s var(--ease) infinite both` }}>
          <div>
            <div style={{ fontWeight: 760, fontSize: '9cqmin', letterSpacing: '-.03em' }}>{p.text}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '3cqmin', letterSpacing: '.14em', marginTop: '1cqmin', opacity: .8 }}>{p.sub}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 14 — Swipe CTA (badge)
function SwipeCTA({ p, dur }) {
  return (
    <div className="m-center" style={{ alignContent: 'center' }}>
      <svg viewBox="0 0 24 24" width="11cqmin" height="11cqmin" fill="none" stroke={p.accent} strokeWidth="2.4"
        strokeLinecap="round" strokeLinejoin="round" style={{ animation: `kArrow ${dur}s ease-in-out infinite` }}>
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
      <div style={{ marginTop: '4cqmin', fontWeight: 640, fontSize: '9cqmin', letterSpacing: '-.02em',
        background: `linear-gradient(100deg, ${p.color} 30%, ${p.accent} 50%, ${p.color} 70%)`,
        backgroundSize: '220% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
        animation: `kShine ${dur}s linear infinite` }}>{p.text}</div>
    </div>
  );
}

/* ============================== KINETIC (motions2) ============================== */

function TypeWriter({ p, dur }) {
  const t = useLoop(dur); const txt = String(p.text || '');
  const n = t < .7 ? Math.floor(easeOut(t / .7) * txt.length) : (t < .92 ? txt.length : 0);
  return (
    <div className="m-center">
      <div style={{ fontWeight: 600, fontSize: '10cqmin', color: p.color, textAlign: 'center', lineHeight: 1.2, letterSpacing: '-.01em', maxWidth: '86cqw' }}>
        {txt.slice(0, n)}<span style={{ color: p.accent, animation: 'kBlink 1s step-end infinite' }}>|</span>
      </div>
    </div>
  );
}

function SlideWords({ p, dur }) {
  const words = String(p.text || '').split(/\s+/).filter(Boolean);
  return (
    <div className="m-center" style={{ alignContent: 'center' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 .3em', fontWeight: 660, fontSize: '13cqmin', letterSpacing: '-.03em', color: p.color, textAlign: 'center', lineHeight: 1.05 }}>
        {words.map((w, i) => (
          <span key={i} style={{ display: 'inline-block', animation: `${i % 2 ? 'kSlideInR' : 'kSlideInL'} ${dur}s var(--ease) ${(i * dur * 0.05).toFixed(2)}s infinite both` }}>{w}</span>
        ))}
      </div>
    </div>
  );
}

function HighlightSweep({ p, dur }) {
  return (
    <div className="m-center">
      <div style={{ fontWeight: 620, fontSize: '12cqmin', color: p.color, textAlign: 'center', lineHeight: 1.18, letterSpacing: '-.02em', maxWidth: '84cqw' }}>
        {p.pre}{' '}
        <span style={{ position: 'relative', display: 'inline-block' }}>
          <span style={{ position: 'absolute', left: '-.12em', right: '-.12em', top: '.08em', bottom: '.04em', background: p.accent, borderRadius: '.1em', transformOrigin: 'left', animation: `kSweep ${dur}s var(--ease) infinite both` }} />
          <span style={{ position: 'relative', color: p.ink }}>{p.word}</span>
        </span>{' '}{p.post}
      </div>
    </div>
  );
}

function StaggerLetters({ p, dur }) {
  const ch = String(p.text || '').split('');
  return (
    <div className="m-center">
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', fontWeight: 720, fontSize: '17cqmin', color: p.color, letterSpacing: '-.02em' }}>
        {ch.map((c, i) => (
          <span key={i} style={{ display: 'inline-block', whiteSpace: 'pre', animation: `kLetterPop ${dur}s var(--ease) ${(i * dur * 0.045).toFixed(2)}s infinite both` }}>{c === ' ' ? ' ' : c}</span>
        ))}
      </div>
    </div>
  );
}

function FlipWords({ p, dur }) {
  const opts = String(p.words || '').split(',').map(s => s.trim()).filter(Boolean);
  const i = useStep(opts.length || 1, dur * 0.6);
  return (
    <div className="m-center">
      <div style={{ fontWeight: 660, fontSize: '12cqmin', color: p.color, textAlign: 'center', letterSpacing: '-.02em', perspective: '600px' }}>
        {p.pre}{' '}
        <span key={i} style={{ display: 'inline-block', color: p.accent, transformStyle: 'preserve-3d', animation: `kFlip ${dur * 0.6}s var(--ease) both` }}>{opts[i % (opts.length || 1)]}</span>
      </div>
    </div>
  );
}

function GradientText({ p, dur }) {
  return (
    <div className="m-center">
      <div style={{ fontWeight: 760, fontSize: '18cqmin', letterSpacing: '-.04em', lineHeight: .95, textAlign: 'center', padding: '6cqmin',
        background: `linear-gradient(100deg, ${p.accent}, ${p.c2}, ${p.accent})`, backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', animation: `kShine ${dur}s linear infinite` }}>{p.text}</div>
    </div>
  );
}

function LineReveal({ p, dur }) {
  const lines = String(p.text || '').split('\n');
  return (
    <div className="m-center" style={{ alignContent: 'center', padding: '9cqmin' }}>
      <div style={{ fontWeight: 640, fontSize: '12cqmin', color: p.color, textAlign: 'left', lineHeight: 1.1, letterSpacing: '-.02em', width: '100%' }}>
        {lines.map((l, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <div style={{ animation: `kWordUp ${dur}s var(--ease) ${(i * dur * 0.08).toFixed(2)}s infinite both` }}>{rich(l, p.accent)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KickerWord({ p, dur }) {
  return (
    <div className="m-center">
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '4cqmin', letterSpacing: '.2em', textTransform: 'uppercase', color: p.accent, marginBottom: '2.4cqmin', animation: `kFadeUp ${dur}s var(--ease) infinite both` }}>{p.kicker}</div>
        <div style={{ fontWeight: 760, fontSize: '20cqmin', letterSpacing: '-.04em', color: p.color, lineHeight: .92, animation: `kPunch ${dur}s var(--ease) infinite both` }}>{p.text}</div>
      </div>
    </div>
  );
}

/* ============================ LOWER-THIRDS ========================== */

function NewsTicker({ p, dur }) {
  return (
    <div className="m-center" style={{ alignContent: 'end' }}>
      <div style={{ width: '100%', display: 'flex', alignItems: 'stretch', background: '#0a0a0a', borderTop: `.6cqmin solid ${p.accent}` }}>
        <div style={{ background: p.accent, color: '#0a0a0a', fontWeight: 780, fontSize: '4cqmin', padding: '2.6cqmin 3cqmin', letterSpacing: '.06em', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>{p.label}</div>
        <div style={{ overflow: 'hidden', flex: 1, display: 'flex', alignItems: 'center' }}>
          <div style={{ whiteSpace: 'nowrap', display: 'inline-block', color: '#fff', fontWeight: 520, fontSize: '4.4cqmin', animation: `kMarqL ${dur * 3}s linear infinite` }}>
            {[0, 1].map(k => <span key={k} style={{ paddingRight: '8cqmin' }}>{p.text}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function NameCard({ p, dur }) {
  return (
    <div className="m-center" style={{ alignContent: 'end', justifyItems: 'start', padding: '9cqmin' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '3cqmin', animation: `kSlideInL ${dur}s var(--ease) infinite both` }}>
        <div style={{ width: '12cqmin', height: '12cqmin', borderRadius: '50%', background: p.accent, color: '#0a0a0a', display: 'grid', placeItems: 'center', fontWeight: 740, fontSize: '5cqmin', flexShrink: 0 }}>{(p.name || '?').charAt(0)}</div>
        <div>
          <div style={{ fontWeight: 680, fontSize: '6.4cqmin', color: p.color, letterSpacing: '-.02em' }}>{p.name}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '3.4cqmin', color: p.accent }}>{p.handle}</div>
        </div>
      </div>
    </div>
  );
}

function LocationTag({ p, dur }) {
  return (
    <div className="m-center" style={{ alignContent: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '2cqmin', background: p.accent, color: p.color, padding: '2.6cqmin 4.4cqmin', borderRadius: '999px', fontWeight: 640, fontSize: '5.2cqmin', animation: `kPop ${dur}s var(--ease) infinite both` }}>
        <svg viewBox="0 0 24 24" width="5cqmin" height="5cqmin" fill="currentColor"><path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" /></svg>
        {p.text}
      </div>
    </div>
  );
}

/* =============================== QUOTE ============================== */

function BigQuote({ p, dur }) {
  const lines = String(p.text || '').split('\n');
  return (
    <div className="m-center" style={{ alignContent: 'center', justifyItems: 'start', padding: '11cqmin' }}>
      <div style={{ fontWeight: 600, fontSize: '13cqmin', color: p.color, lineHeight: 1.08, letterSpacing: '-.03em', textAlign: 'left' }}>
        {lines.map((l, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <div style={{ animation: `kWordUp ${dur}s var(--ease) ${(i * dur * 0.07).toFixed(2)}s infinite both` }}>{rich(l, p.accent)}</div>
          </div>
        ))}
      </div>
      <div style={{ height: '.7cqmin', width: '14cqmin', background: p.accent, marginTop: '5cqmin', transformOrigin: 'left', animation: `kSweep ${dur}s var(--ease) infinite both` }} />
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '3.4cqmin', letterSpacing: '.1em', textTransform: 'uppercase', color: p.color, opacity: .65, marginTop: '3cqmin' }}>{p.by}</div>
    </div>
  );
}

function TweetCard({ p, dur }) {
  return (
    <div className="m-center" style={{ padding: '8cqmin' }}>
      <div style={{ width: '100%', background: '#fff', borderRadius: '4cqmin', padding: '5cqmin', boxShadow: '0 6cqmin 16cqmin -6cqmin rgba(0,0,0,.55)', animation: `kPop ${dur}s var(--ease) infinite both` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.6cqmin', marginBottom: '3cqmin' }}>
          <div style={{ width: '9cqmin', height: '9cqmin', borderRadius: '50%', background: p.accent, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 740, fontSize: '4.2cqmin' }}>{(p.name || '?').charAt(0)}</div>
          <div><div style={{ fontWeight: 700, fontSize: '4cqmin', color: '#0f1419' }}>{p.name}</div><div style={{ fontSize: '3.2cqmin', color: '#536471' }}>{p.handle}</div></div>
        </div>
        <div style={{ fontSize: '5cqmin', color: '#0f1419', lineHeight: 1.3 }}>{rich(p.text, p.accent)}</div>
      </div>
    </div>
  );
}

function ChatBubble({ p, dur }) {
  const msgs = String(p.text || '').split('\n').filter(Boolean);
  return (
    <div className="m-center" style={{ alignContent: 'center', padding: '8cqmin' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.4cqmin', width: '100%' }}>
        {msgs.map((m, i) => {
          const me = i % 2 === 1;
          return (
            <div key={i} style={{ alignSelf: me ? 'flex-end' : 'flex-start', maxWidth: '76%', background: me ? p.accent : '#23262d', color: me ? '#0a0a0a' : '#fff',
              padding: '2.8cqmin 3.6cqmin', borderRadius: '4cqmin', borderBottomRightRadius: me ? '.6cqmin' : '4cqmin', borderBottomLeftRadius: me ? '4cqmin' : '.6cqmin',
              fontSize: '4.2cqmin', fontWeight: 500, animation: `kPop ${dur}s var(--ease) ${(i * dur * 0.12).toFixed(2)}s infinite both` }}>{m}</div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================== COUNTER ============================= */

function BigPercent({ p, dur }) {
  const t = useLoop(dur); const target = parseFloat(p.value) || 0;
  const val = target * (t < .6 ? easeOut(t / .6) : 1);
  return (
    <div className="m-center">
      <div style={{ position: 'relative', width: '54cqmin', height: '54cqmin', borderRadius: '50%', display: 'grid', placeItems: 'center',
        background: `conic-gradient(${p.accent} ${val * 3.6}deg, rgba(128,128,128,.18) 0deg)` }}>
        <div style={{ width: '42cqmin', height: '42cqmin', borderRadius: '50%', background: p.bg, display: 'grid', placeItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 740, fontSize: '14cqmin', color: p.color, fontFamily: 'var(--font-mono)', letterSpacing: '-.03em' }}>{Math.round(val)}%</div>
            <div style={{ fontSize: '3.2cqmin', color: p.color, opacity: .7, marginTop: '1cqmin' }}>{p.label}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Comparison({ p, dur }) {
  const t = useLoop(dur); const pr = t < .6 ? easeOut(t / .6) : 1;
  const cols = [[p.l1, (parseFloat(p.v1) || 0) * pr, p.accent], [p.l2, (parseFloat(p.v2) || 0) * pr, p.color]];
  return (
    <div className="m-center">
      <div style={{ display: 'flex', alignItems: 'center', gap: '6cqmin' }}>
        {cols.map((c, i) => (
          <React.Fragment key={i}>
            {i === 1 && <div style={{ fontWeight: 700, fontSize: '7cqmin', color: p.color, opacity: .35 }}>vs</div>}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 760, fontSize: '16cqmin', color: c[2], fontFamily: 'var(--font-mono)', letterSpacing: '-.03em' }}>{fmtNum(c[1])}</div>
              <div style={{ fontSize: '3.4cqmin', color: p.color, opacity: .7, marginTop: '1cqmin', textTransform: 'uppercase', letterSpacing: '.08em' }}>{c[0]}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function Odometer({ p, dur }) {
  const t = useLoop(dur); const target = parseFloat(p.value) || 0;
  const val = target * (t < .7 ? easeOut(t / .7) : 1);
  return (
    <div className="m-center">
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '4cqmin', letterSpacing: '.16em', textTransform: 'uppercase', color: p.accent, marginBottom: '3cqmin' }}>{p.label}</div>
        <div style={{ fontWeight: 760, fontSize: '20cqmin', color: p.color, fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', letterSpacing: '-.02em' }}>{p.prefix}{fmtNum(val)}</div>
      </div>
    </div>
  );
}

/* ============================ BACKGROUND =========================== */

function GridPulse({ p, dur }) {
  const N = 8; const dots = [];
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) dots.push([r, c]);
  return (
    <div className="m-center" style={{ overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: '7cqmin', display: 'grid', gridTemplateColumns: `repeat(${N},1fr)`, gridTemplateRows: `repeat(${N},1fr)`, placeItems: 'center' }}>
        {dots.map(([r, c], i) => <span key={i} style={{ width: '1.5cqmin', height: '1.5cqmin', borderRadius: '50%', background: p.accent, animation: `kGridDot ${dur}s ease-in-out ${((r + c) * 0.06).toFixed(2)}s infinite` }} />)}
      </div>
      <div style={{ position: 'relative', fontWeight: 740, fontSize: '15cqmin', color: p.color, textAlign: 'center', letterSpacing: '-.03em' }}>{p.text}</div>
    </div>
  );
}

function NoiseGradient({ p, dur }) {
  return (
    <div className="m-center" style={{ overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: '-40%', background: `conic-gradient(from 0deg, ${p.accent}, ${p.c2}, ${p.c3}, ${p.accent})`, filter: 'blur(10cqmin)', animation: `kSpin ${dur * 3}s linear infinite` }} />
      <div style={{ position: 'absolute', fontWeight: 760, fontSize: '16cqmin', color: p.color, textAlign: 'center', letterSpacing: '-.04em', opacity: .92 }}>{p.text}</div>
    </div>
  );
}

function Stripes({ p, dur }) {
  return (
    <div className="m-center" style={{ overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(45deg, ${p.accent} 0 8cqmin, transparent 8cqmin 16cqmin)`, animation: `kStripes ${dur}s linear infinite`, opacity: .9 }} />
      <div style={{ position: 'relative', background: p.bg, padding: '3.4cqmin 6cqmin', borderRadius: '2cqmin', fontWeight: 760, fontSize: '13cqmin', color: p.color, letterSpacing: '-.03em', textAlign: 'center' }}>{p.text}</div>
    </div>
  );
}

function Spotlight({ p, dur }) {
  return (
    <div className="m-center" style={{ overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: '74cqmin', height: '74cqmin', borderRadius: '50%', background: `radial-gradient(circle, ${p.accent}55, transparent 70%)`, left: '13%', top: '13%', animation: `kSpot ${dur * 2}s ease-in-out infinite` }} />
      <div style={{ position: 'relative', fontWeight: 760, fontSize: '15cqmin', color: p.color, textAlign: 'center', letterSpacing: '-.03em' }}>{p.text}</div>
    </div>
  );
}

/* ============================== BADGE ============================== */

function PillPop({ p, dur }) {
  const items = String(p.text || '').split(',').map(s => s.trim()).filter(Boolean);
  return (
    <div className="m-center">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2.4cqmin', maxWidth: '84cqw' }}>
        {items.map((it, i) => (
          <span key={i} style={{ background: i % 2 ? p.color : p.accent, color: i % 2 ? p.bg : '#0a0a0a', padding: '2.4cqmin 4cqmin', borderRadius: '999px', fontWeight: 640, fontSize: '5cqmin', animation: `kPop ${dur}s var(--ease) ${(i * dur * 0.1).toFixed(2)}s infinite both` }}>{it}</span>
        ))}
      </div>
    </div>
  );
}

function Subscribe({ p, dur }) {
  return (
    <div className="m-center">
      <div style={{ display: 'flex', alignItems: 'center', gap: '3cqmin', animation: `kPop ${dur}s var(--ease) infinite both` }}>
        <div style={{ background: p.accent, color: '#0a0a0a', padding: '3cqmin 5cqmin', borderRadius: '2cqmin', fontWeight: 720, fontSize: '5.4cqmin' }}>{p.text}</div>
        <svg viewBox="0 0 24 24" width="9cqmin" height="9cqmin" fill={p.color} style={{ transformOrigin: 'top center', animation: `kShake ${dur}s ease-in-out infinite` }}>
          <path d="M12 2a2 2 0 00-2 2v.6A6 6 0 006 10v4l-2 2v1h16v-1l-2-2v-4a6 6 0 00-4-5.4V4a2 2 0 00-2-2zm0 20a2.5 2.5 0 002.5-2.5h-5A2.5 2.5 0 0012 22z" />
        </svg>
      </div>
    </div>
  );
}

function SaleBurst({ p, dur }) {
  const spikes = 12; const pts = [];
  for (let i = 0; i < spikes * 2; i++) { const a = (i / (spikes * 2)) * Math.PI * 2; const rad = i % 2 ? 33 : 48; pts.push(`${(50 + Math.cos(a) * rad).toFixed(1)}% ${(50 + Math.sin(a) * rad).toFixed(1)}%`); }
  return (
    <div className="m-center">
      <div style={{ position: 'relative', width: '50cqmin', height: '50cqmin', display: 'grid', placeItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: p.accent, clipPath: `polygon(${pts.join(',')})`, animation: `kSpin ${dur * 6}s linear infinite` }} />
        <div style={{ position: 'relative', textAlign: 'center', color: p.color, fontWeight: 820, lineHeight: .9, animation: `kBeat ${dur}s ease-in-out infinite` }}>
          <div style={{ fontSize: '11cqmin', letterSpacing: '-.04em' }}>{p.text}</div>
          <div style={{ fontSize: '4cqmin', fontWeight: 600, marginTop: '1cqmin' }}>{p.sub}</div>
        </div>
      </div>
    </div>
  );
}

/* =============================== SOCIAL ============================ */

function LikeBurst({ p, dur }) {
  const t = useLoop(dur); const cnt = Math.round((parseFloat(p.value) || 0) * (t < .5 ? easeOut(t / .5) : 1));
  return (
    <div className="m-center">
      <div style={{ display: 'flex', alignItems: 'center', gap: '3cqmin' }}>
        <svg viewBox="0 0 24 24" width="16cqmin" height="16cqmin" fill={p.accent} style={{ animation: `kBeat ${dur}s ease-in-out infinite` }}>
          <path d="M12 21s-7-4.5-9.2-8.2C1.2 10 2.5 6 6 6c2 0 3.2 1.4 4 2.6C10.8 7.4 12 6 14 6c3.5 0 4.8 4 3.2 6.8C19 16.5 12 21 12 21z" />
        </svg>
        <div style={{ fontWeight: 740, fontSize: '11cqmin', color: p.color, fontFamily: 'var(--font-mono)' }}>{fmtNum(cnt)}</div>
      </div>
    </div>
  );
}

function FollowBtn({ p, dur }) {
  const following = useStep(2, dur * 0.5) === 1;
  return (
    <div className="m-center">
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '2cqmin', background: following ? 'transparent' : p.accent, color: following ? p.color : '#0a0a0a',
        border: `.6cqmin solid ${following ? p.color : p.accent}`, padding: '3cqmin 6cqmin', borderRadius: '999px', fontWeight: 700, fontSize: '5.4cqmin', transition: 'all .3s var(--ease)' }}>
        {following ? '✓ ' : ''}{following ? p.text2 : p.text}
      </div>
    </div>
  );
}

function NotifyToast({ p, dur }) {
  return (
    <div className="m-center" style={{ alignContent: 'start', padding: '8cqmin' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '3cqmin', background: '#fff', borderRadius: '3.4cqmin', padding: '3.4cqmin 4cqmin', width: '100%', boxShadow: '0 6cqmin 14cqmin -6cqmin rgba(0,0,0,.5)', animation: `kSlideDown ${dur}s var(--ease) infinite both` }}>
        <div style={{ width: '10cqmin', height: '10cqmin', borderRadius: '2.6cqmin', background: p.accent, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" width="5.4cqmin" height="5.4cqmin" fill="#0a0a0a"><path d="M12 2a7 7 0 00-7 7v4l-2 2v1h18v-1l-2-2V9a7 7 0 00-7-7zm0 20a2.5 2.5 0 002.5-2.5h-5A2.5 2.5 0 0012 22z" /></svg>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: '4cqmin', color: '#0a0a0a' }}>{p.title}</div>
          <div style={{ fontSize: '3.4cqmin', color: '#555', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.text}</div>
        </div>
      </div>
    </div>
  );
}

function LiveBadge({ p, dur }) {
  return (
    <div className="m-center">
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '2.4cqmin', background: '#0a0a0a', border: `.5cqmin solid ${p.accent}`, padding: '2.8cqmin 4.6cqmin', borderRadius: '999px', animation: `kPop ${dur}s var(--ease) infinite both` }}>
        <span style={{ position: 'relative', width: '4cqmin', height: '4cqmin' }}>
          <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: p.accent }} />
          <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: p.accent, animation: `kPulseRing ${dur * 0.6}s ease-out infinite` }} />
        </span>
        <span style={{ color: '#fff', fontWeight: 760, fontSize: '5cqmin', letterSpacing: '.1em' }}>{p.text}</span>
      </div>
    </div>
  );
}

/* =============================== LIST ============================== */

function Checklist({ p, dur }) {
  const items = String(p.text || '').split('\n').filter(Boolean);
  return (
    <div className="m-center" style={{ alignContent: 'center', padding: '11cqmin' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3.4cqmin', width: '100%' }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '3cqmin', animation: `kSlideInL ${dur}s var(--ease) ${(i * dur * 0.08).toFixed(2)}s infinite both` }}>
            <span style={{ width: '7cqmin', height: '7cqmin', borderRadius: '2cqmin', background: p.accent, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" width="4.4cqmin" height="4.4cqmin" fill="none" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6" /></svg>
            </span>
            <span style={{ fontWeight: 560, fontSize: '5cqmin', color: p.color }}>{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Steps({ p, dur }) {
  const items = String(p.text || '').split('\n').filter(Boolean);
  return (
    <div className="m-center" style={{ alignContent: 'center', padding: '10cqmin' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3.6cqmin', width: '100%' }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '3.4cqmin', animation: `kFadeUp ${dur}s var(--ease) ${(i * dur * 0.1).toFixed(2)}s infinite both` }}>
            <span style={{ width: '9cqmin', height: '9cqmin', borderRadius: '50%', border: `.6cqmin solid ${p.accent}`, color: p.accent, display: 'grid', placeItems: 'center', flexShrink: 0, fontWeight: 740, fontSize: '4.4cqmin', fontFamily: 'var(--font-mono)' }}>{i + 1}</span>
            <span style={{ fontWeight: 560, fontSize: '5cqmin', color: p.color }}>{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================================================================== *
   REGISTRY  — metadata + editable field schema + defaults
 * ===================================================================== */
const F = {
  text:  (key, label) => ({ key, label, type: 'text' }),
  area:  (key, label) => ({ key, label, type: 'area' }),
  color: (key, label) => ({ key, label, type: 'color' }),
  bg:    () => ({ key: 'bg', label: 'Fundo', type: 'bg' }),
};

const MOTIONS = [
  { id: 'word-rise', name: 'Word Rise', cat: 'kinetic', Comp: WordRise, base: 3.6, format: 'square', rich: true,
    fields: [F.area('text','Texto'), F.color('color','Cor do texto'), F.color('accent','Destaque'), F.bg()],
    defaults: { text: 'ideias que *se movem*', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },

  { id: 'punch-in', name: 'Punch In', cat: 'kinetic', Comp: PunchIn, base: 3.2, format: 'square', rich: true,
    fields: [F.area('text','Texto'), F.color('color','Cor do texto'), F.color('accent','Destaque'), F.bg()],
    defaults: { text: 'foco\n*total*', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },

  { id: 'word-swap', name: 'Word Swap', cat: 'kinetic', Comp: WordSwap, base: 4.4, format: 'square',
    fields: [F.text('pre','Antes'), F.text('words','Palavras (vírgula)'), F.text('post','Depois'),
             F.color('color','Texto'), F.color('accent','Destaque'), F.bg()],
    defaults: { pre: 'feito para', words: 'criadores,marcas,você,todos', post: '', color: '#ffffff', accent: '#c8ff2d', bg: '#111317' } },

  { id: 'scramble', name: 'Scramble', cat: 'kinetic', Comp: Scramble, base: 4, format: 'square',
    fields: [F.text('text','Texto'), F.color('color','Texto'), F.color('accent','Cursor'), F.bg()],
    defaults: { text: 'OPENSOURCES', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },

  { id: 'caption-bar', name: 'Caption Bar', cat: 'lower-third', Comp: CaptionBar, base: 4.2, format: 'wide',
    fields: [F.text('name','Nome'), F.text('role','Função'), F.color('color','Texto'), F.color('accent','Destaque'), F.bg()],
    defaults: { name: 'Marina Costa', role: 'Diretora de criação', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },

  { id: 'tag-pop', name: 'Tag Pop', cat: 'lower-third', Comp: TagPop, base: 3.6, format: 'portrait',
    fields: [F.text('text','Texto'), F.color('color','Texto'), F.color('accent','Fundo do selo'), F.bg()],
    defaults: { text: 'novo episódio', color: '#0a0a0a', accent: '#c8ff2d', bg: '#111317' } },

  { id: 'quote-mark', name: 'Quote Mark', cat: 'quote', Comp: QuoteMark, base: 5, format: 'square', rich: true,
    fields: [F.area('text','Citação'), F.text('by','Autor'), F.color('color','Texto'), F.color('accent','Destaque'), F.bg()],
    defaults: { text: 'o design não é como *parece*, é como *funciona*', by: 'Steve Jobs', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },

  { id: 'testimonial', name: 'Testimonial', cat: 'quote', Comp: Testimonial, base: 5, format: 'portrait', rich: true,
    fields: [F.area('text','Depoimento'), F.text('by','Nome'), F.text('role','Cargo'), F.color('color','Texto'), F.color('accent','Destaque'), F.bg()],
    defaults: { text: 'mudou completamente a forma como a gente posta', by: 'João P.', role: '@joaop', color: '#ffffff', accent: '#c8ff2d', bg: '#111317' } },

  { id: 'count-up', name: 'Count Up', cat: 'counter', Comp: CountUp, base: 4, format: 'square',
    fields: [F.text('value','Número'), F.text('prefix','Prefixo'), F.text('suffix','Sufixo'), F.text('label','Legenda'),
             F.color('color','Texto'), F.color('accent','Destaque'), F.bg()],
    defaults: { value: '12500', prefix: '', suffix: '+', label: 'seguidores este mês', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },

  { id: 'stat-bars', name: 'Stat Bars', cat: 'counter', Comp: StatBars, base: 4, format: 'square',
    fields: [F.text('l1','Linha 1'), F.text('v1','% 1'), F.text('l2','Linha 2'), F.text('v2','% 2'),
             F.text('l3','Linha 3'), F.text('v3','% 3'), F.color('color','Texto'), F.color('accent','Destaque'), F.bg()],
    defaults: { l1: 'Alcance', v1: '92', l2: 'Engajamento', v2: '68', l3: 'Conversão', v3: '41', color: '#ffffff', accent: '#c8ff2d', bg: '#111317' } },

  { id: 'mesh-flow', name: 'Mesh Flow', cat: 'background', Comp: MeshFlow, base: 4, format: 'story',
    fields: [F.text('text','Texto'), F.color('color','Texto'), F.color('accent','Cor 1'), F.color('c2','Cor 2'), F.color('c3','Cor 3'), F.bg()],
    defaults: { text: 'fluxo', color: '#ffffff', accent: '#c8ff2d', c2: '#5b8cff', c3: '#ff4d8d', bg: '#0a0a0a' } },

  { id: 'marquee', name: 'Marquee', cat: 'background', Comp: Marquee, base: 4, format: 'square',
    fields: [F.text('text','Faixa 1'), F.text('text2','Faixa 2'), F.color('color','Texto'), F.color('accent','Faixa'), F.bg()],
    defaults: { text: 'OPEN SOURCES', text2: 'COPIE · EDITE · POSTE', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },

  { id: 'pulse-badge', name: 'Pulse Badge', cat: 'badge', Comp: PulseBadge, base: 2.6, format: 'square',
    fields: [F.text('text','Texto'), F.text('sub','Subtexto'), F.color('color','Texto'), F.color('accent','Cor'), F.bg()],
    defaults: { text: 'NOVO', sub: 'DISPONÍVEL', color: '#0a0a0a', accent: '#c8ff2d', bg: '#111317' } },

  { id: 'swipe-cta', name: 'Swipe CTA', cat: 'badge', Comp: SwipeCTA, base: 2.4, format: 'story',
    fields: [F.text('text','Texto'), F.color('color','Texto'), F.color('accent','Destaque'), F.bg()],
    defaults: { text: 'arrasta pra cima', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },

  // ---- motions2 (MORE) ----
  { id: 'type-writer', name: 'Type Writer', cat: 'kinetic', Comp: TypeWriter, base: 4, format: 'square',
    fields: [F.text('text', 'Texto'), F.color('color', 'Texto'), F.color('accent', 'Cursor'), F.bg()],
    defaults: { text: 'digitando ao vivo…', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },
  { id: 'slide-words', name: 'Slide Words', cat: 'kinetic', Comp: SlideWords, base: 3.6, format: 'square',
    fields: [F.area('text', 'Texto'), F.color('color', 'Texto'), F.bg()],
    defaults: { text: 'entra de todos os lados', color: '#ffffff', bg: '#111317' } },
  { id: 'highlight-sweep', name: 'Highlight Sweep', cat: 'kinetic', Comp: HighlightSweep, base: 3.8, format: 'square',
    fields: [F.text('pre', 'Antes'), F.text('word', 'Palavra'), F.text('post', 'Depois'), F.color('color', 'Texto'), F.color('accent', 'Marcador'), F.color('ink', 'Texto marcado'), F.bg()],
    defaults: { pre: 'isso é', word: 'importante', post: '', color: '#ffffff', accent: '#c8ff2d', ink: '#0a0a0a', bg: '#0a0a0a' } },
  { id: 'stagger-letters', name: 'Stagger Letters', cat: 'kinetic', Comp: StaggerLetters, base: 3.4, format: 'square',
    fields: [F.text('text', 'Texto'), F.color('color', 'Texto'), F.bg()],
    defaults: { text: 'BOOM', color: '#c8ff2d', bg: '#0a0a0a' } },
  { id: 'flip-words', name: 'Flip Words', cat: 'kinetic', Comp: FlipWords, base: 4.4, format: 'square',
    fields: [F.text('pre', 'Antes'), F.text('words', 'Palavras (vírgula)'), F.color('color', 'Texto'), F.color('accent', 'Destaque'), F.bg()],
    defaults: { pre: 'somos', words: 'rápidos,ousados,abertos', color: '#ffffff', accent: '#c8ff2d', bg: '#111317' } },
  { id: 'gradient-text', name: 'Gradient Text', cat: 'kinetic', Comp: GradientText, base: 4, format: 'square',
    fields: [F.area('text', 'Texto'), F.color('accent', 'Cor 1'), F.color('c2', 'Cor 2'), F.bg()],
    defaults: { text: 'fluido', accent: '#c8ff2d', c2: '#5b8cff', color: '#ffffff', bg: '#0a0a0a' } },
  { id: 'line-reveal', name: 'Line Reveal', cat: 'kinetic', Comp: LineReveal, base: 4.2, format: 'square', rich: true,
    fields: [F.area('text', 'Texto (linha a linha)'), F.color('color', 'Texto'), F.color('accent', 'Destaque'), F.bg()],
    defaults: { text: 'menos\né\n*mais*', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },
  { id: 'kicker-word', name: 'Kicker Word', cat: 'kinetic', Comp: KickerWord, base: 3.6, format: 'square',
    fields: [F.text('kicker', 'Kicker'), F.text('text', 'Palavra'), F.color('color', 'Texto'), F.color('accent', 'Kicker'), F.bg()],
    defaults: { kicker: 'apresentamos', text: 'OPEN', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },

  { id: 'news-ticker', name: 'News Ticker', cat: 'lower-third', Comp: NewsTicker, base: 4, format: 'wide',
    fields: [F.text('label', 'Selo'), F.text('text', 'Manchete'), F.color('accent', 'Selo'), F.bg()],
    defaults: { label: 'URGENTE', text: 'OpenSources lança 30 novos componentes em motion', accent: '#c8ff2d', color: '#ffffff', bg: '#111317' } },
  { id: 'name-card', name: 'Name Card', cat: 'lower-third', Comp: NameCard, base: 4, format: 'wide',
    fields: [F.text('name', 'Nome'), F.text('handle', '@'), F.color('color', 'Texto'), F.color('accent', 'Destaque'), F.bg()],
    defaults: { name: 'Marina Costa', handle: '@marina', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },
  { id: 'location-tag', name: 'Location Tag', cat: 'lower-third', Comp: LocationTag, base: 3.6, format: 'portrait',
    fields: [F.text('text', 'Local'), F.color('color', 'Texto'), F.color('accent', 'Fundo'), F.bg()],
    defaults: { text: 'São Paulo, BR', color: '#0a0a0a', accent: '#c8ff2d', bg: '#111317' } },

  { id: 'big-quote', name: 'Big Quote', cat: 'quote', Comp: BigQuote, base: 5, format: 'square', rich: true,
    fields: [F.area('text', 'Citação (linha a linha)'), F.text('by', 'Autor'), F.color('color', 'Texto'), F.color('accent', 'Destaque'), F.bg()],
    defaults: { text: 'faça\ncoisas que\n*importam*', by: 'OpenSources', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },
  { id: 'tweet-card', name: 'Tweet Card', cat: 'quote', Comp: TweetCard, base: 4.2, format: 'square', rich: true,
    fields: [F.text('name', 'Nome'), F.text('handle', '@'), F.area('text', 'Post'), F.color('accent', 'Avatar'), F.bg()],
    defaults: { name: 'Lia', handle: '@liadev', text: 'descobri o *OpenSources* e não paro de criar', accent: '#1d9bf0', color: '#ffffff', bg: '#0a0a0a' } },
  { id: 'chat-bubble', name: 'Chat Bubble', cat: 'quote', Comp: ChatBubble, base: 4.6, format: 'portrait',
    fields: [F.area('text', 'Mensagens (linha a linha)'), F.color('accent', 'Sua bolha'), F.bg()],
    defaults: { text: 'já viu o OpenSources?\nvi! que demais\ndá pra editar tudo', accent: '#c8ff2d', color: '#ffffff', bg: '#0a0a0a' } },

  { id: 'big-percent', name: 'Big Percent', cat: 'counter', Comp: BigPercent, base: 4, format: 'square',
    fields: [F.text('value', '%'), F.text('label', 'Legenda'), F.color('color', 'Texto'), F.color('accent', 'Anel'), F.bg()],
    defaults: { value: '87', label: 'satisfação', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },
  { id: 'comparison', name: 'Comparison', cat: 'counter', Comp: Comparison, base: 4, format: 'square',
    fields: [F.text('l1', 'Rótulo 1'), F.text('v1', 'Valor 1'), F.text('l2', 'Rótulo 2'), F.text('v2', 'Valor 2'), F.color('color', 'Texto'), F.color('accent', 'Destaque'), F.bg()],
    defaults: { l1: 'antes', v1: '120', l2: 'depois', v2: '940', color: '#ffffff', accent: '#c8ff2d', bg: '#111317' } },
  { id: 'odometer', name: 'Odometer', cat: 'counter', Comp: Odometer, base: 4, format: 'square',
    fields: [F.text('value', 'Número'), F.text('prefix', 'Prefixo'), F.text('label', 'Legenda'), F.color('color', 'Texto'), F.color('accent', 'Legenda'), F.bg()],
    defaults: { value: '1000000', prefix: '', label: 'downloads', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },

  { id: 'grid-pulse', name: 'Grid Pulse', cat: 'background', Comp: GridPulse, base: 3, format: 'square',
    fields: [F.text('text', 'Texto'), F.color('color', 'Texto'), F.color('accent', 'Pontos'), F.bg()],
    defaults: { text: 'sistema', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },
  { id: 'noise-gradient', name: 'Noise Gradient', cat: 'background', Comp: NoiseGradient, base: 4, format: 'story',
    fields: [F.text('text', 'Texto'), F.color('color', 'Texto'), F.color('accent', 'Cor 1'), F.color('c2', 'Cor 2'), F.color('c3', 'Cor 3'), F.bg()],
    defaults: { text: 'energia', color: '#ffffff', accent: '#c8ff2d', c2: '#5b8cff', c3: '#ff4d8d', bg: '#0a0a0a' } },
  { id: 'stripes', name: 'Stripes', cat: 'background', Comp: Stripes, base: 5, format: 'square',
    fields: [F.text('text', 'Texto'), F.color('color', 'Texto'), F.color('accent', 'Listras'), F.bg()],
    defaults: { text: 'ATENÇÃO', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },
  { id: 'spotlight', name: 'Spotlight', cat: 'background', Comp: Spotlight, base: 4, format: 'square',
    fields: [F.text('text', 'Texto'), F.color('color', 'Texto'), F.color('accent', 'Luz'), F.bg()],
    defaults: { text: 'em foco', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },

  { id: 'pill-pop', name: 'Pill Pop', cat: 'badge', Comp: PillPop, base: 3.4, format: 'square',
    fields: [F.area('text', 'Tags (vírgula)'), F.color('color', 'Cor B'), F.color('accent', 'Cor A'), F.bg()],
    defaults: { text: 'design, motion, código, open', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },
  { id: 'subscribe', name: 'Subscribe', cat: 'badge', Comp: Subscribe, base: 3, format: 'wide',
    fields: [F.text('text', 'Botão'), F.color('color', 'Sino'), F.color('accent', 'Botão'), F.bg()],
    defaults: { text: 'Inscreva-se', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },
  { id: 'sale-burst', name: 'Sale Burst', cat: 'badge', Comp: SaleBurst, base: 3, format: 'square',
    fields: [F.text('text', 'Texto'), F.text('sub', 'Subtexto'), F.color('color', 'Texto'), F.color('accent', 'Estrela'), F.bg()],
    defaults: { text: '-50%', sub: 'só hoje', color: '#0a0a0a', accent: '#c8ff2d', bg: '#111317' } },

  { id: 'like-burst', name: 'Like Burst', cat: 'social', Comp: LikeBurst, base: 3.4, format: 'square',
    fields: [F.text('value', 'Curtidas'), F.color('color', 'Texto'), F.color('accent', 'Coração'), F.bg()],
    defaults: { value: '2400', color: '#ffffff', accent: '#ff4d8d', bg: '#0a0a0a' } },
  { id: 'follow-btn', name: 'Follow Button', cat: 'social', Comp: FollowBtn, base: 3.6, format: 'wide',
    fields: [F.text('text', 'Estado 1'), F.text('text2', 'Estado 2'), F.color('color', 'Texto'), F.color('accent', 'Botão'), F.bg()],
    defaults: { text: 'Seguir', text2: 'Seguindo', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },
  { id: 'notify-toast', name: 'Notification', cat: 'social', Comp: NotifyToast, base: 4, format: 'wide',
    fields: [F.text('title', 'Título'), F.text('text', 'Mensagem'), F.color('accent', 'Ícone'), F.bg()],
    defaults: { title: 'OpenSources', text: 'seu vídeo está pronto para baixar', accent: '#c8ff2d', color: '#ffffff', bg: '#111317' } },
  { id: 'live-badge', name: 'Live Badge', cat: 'social', Comp: LiveBadge, base: 2.4, format: 'square',
    fields: [F.text('text', 'Texto'), F.color('accent', 'Cor'), F.bg()],
    defaults: { text: 'AO VIVO', accent: '#ff4d4d', color: '#ffffff', bg: '#0a0a0a' } },

  { id: 'checklist', name: 'Checklist', cat: 'list', Comp: Checklist, base: 4.2, format: 'square',
    fields: [F.area('text', 'Itens (linha a linha)'), F.color('color', 'Texto'), F.color('accent', 'Caixa'), F.bg()],
    defaults: { text: 'copiar\neditar\nbaixar\npostar', color: '#ffffff', accent: '#c8ff2d', bg: '#0a0a0a' } },
  { id: 'steps', name: 'Steps', cat: 'list', Comp: Steps, base: 4.4, format: 'portrait',
    fields: [F.area('text', 'Passos (linha a linha)'), F.color('color', 'Texto'), F.color('accent', 'Número'), F.bg()],
    defaults: { text: 'escolha o componente\nedite o texto\nexporte o vídeo', color: '#ffffff', accent: '#c8ff2d', bg: '#111317' } },
];

const CATS = [
  { id: 'all', label: 'Todos' },
  { id: 'kinetic', label: 'Tipografia cinética' },
  { id: 'lower-third', label: 'Lower-thirds' },
  { id: 'quote', label: 'Citações' },
  { id: 'counter', label: 'Contadores' },
  { id: 'background', label: 'Fundos' },
  { id: 'badge', label: 'Selos & CTA' },
  { id: 'social', label: 'Social' },
  { id: 'list', label: 'Listas' },
];
const CAT_LABEL = Object.fromEntries(CATS.map(c => [c.id, c.label]));

/* Stage wrapper used everywhere a motion is shown live. */
function Stage({ motion, props, speed = 1, format }) {
  const fmt = format || motion.format;
  const dur = motion.base / (speed || 1);
  const C = motion.Comp;
  const scale = props._scale ?? 1;
  return (
    <div className={`stage stage-fmt-${fmt}`} style={{ '--stage-bg': props.bg,
      fontFamily: FONTS[props._font] || FONTS.geist,
      textTransform: props._upper ? 'uppercase' : 'none' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${scale})`, transformOrigin: 'center' }}>
        <C p={props} dur={dur} />
      </div>
    </div>
  );
}

export { MOTIONS, CATS, CAT_LABEL, TEXT_COLORS, BG_COLORS, FONTS, FONT_OPTS, F, rich, Stage, fmtNum };

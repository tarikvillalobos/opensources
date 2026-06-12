import type { CSSProperties, ReactNode } from "react";

export const ICONS: Record<string, ReactNode> = {
  logo: <path d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4M3 17l9 4 9-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
  search: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></g>,
  sun: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="4.2" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" /></g>,
  moon: <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  plus: <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  code: <path d="M8 6l-5 6 5 6M16 6l5 6-5 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  copy: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 012-2h10" /></g>,
  film: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M3 15h18M8 4v16M16 4v16" /></g>,
  gif: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 12h-2v-1h2" /></g>,
  check: <path d="M4 12l5 5L20 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />,
  close: <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  reset: <path d="M3 12a9 9 0 109-9 9 9 0 00-7 3.3M3 3v4h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  download: <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 20h16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  sq: <rect x="5" y="5" width="14" height="14" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />,
  port: <rect x="7" y="4" width="10" height="16" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />,
  story: <rect x="8.5" y="3" width="7" height="18" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />,
  wide: <rect x="3" y="7" width="18" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />,
  spark: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
  heart: <path d="M12 20s-7-4.5-9.2-8.2C1.2 9 2.5 5.5 6 5.5c2 0 3.2 1.3 4 2.5.8-1.2 2-2.5 4-2.5 3.5 0 4.8 3.5 3.2 6.3C19 15.5 12 20 12 20z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />,
};

export function Icon({ k, size, style }: { k: string; size?: number; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 18} height={size || 18} style={{ display: "block", ...style }}>
      {ICONS[k]}
    </svg>
  );
}

export const Ticks = () => (
  <>
    <span className="tick tl" />
    <span className="tick tr" />
    <span className="tick bl" />
    <span className="tick br" />
  </>
);

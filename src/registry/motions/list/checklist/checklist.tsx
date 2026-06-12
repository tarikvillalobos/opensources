"use client";
import type { MotionRenderProps } from "@/registry/types";
import { lines } from "@/registry/lib/text";

export default function Checklist({ p, dur }: MotionRenderProps) {
  const items = lines(p.text, true);
  return (
    <div className="m-center" style={{ alignContent: "center", padding: "11cqmin" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "3.4cqmin", width: "100%" }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "3cqmin", animation: `kSlideInL ${dur}s var(--ease) ${(i * dur * 0.08).toFixed(2)}s infinite both` }}>
            <span style={{ width: "7cqmin", height: "7cqmin", borderRadius: "2cqmin", background: p.accent, display: "grid", placeItems: "center", flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" width="4.4cqmin" height="4.4cqmin" fill="none" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6" /></svg>
            </span>
            <span style={{ fontWeight: 560, fontSize: "5cqmin", color: p.color }}>{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

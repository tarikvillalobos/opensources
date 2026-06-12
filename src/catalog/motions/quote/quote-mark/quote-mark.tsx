"use client";
import type { MotionRenderProps } from "@/catalog/types";
import { rich } from "@/catalog/lib/rich-text";

export default function QuoteMark({ p, dur }: MotionRenderProps) {
  return (
    <div className="m-center" style={{ alignContent: "center", padding: "10cqmin" }}>
      <div style={{ fontFamily: "Georgia, serif", fontSize: "34cqmin", lineHeight: 0.6, color: p.accent,
        height: "12cqmin", animation: `kQuoteMark ${dur}s var(--ease) infinite both` }}>“</div>
      <div style={{ fontWeight: 560, fontSize: "8.4cqmin", lineHeight: 1.18, letterSpacing: "-.02em",
        color: p.color, textAlign: "center", maxWidth: "82cqw", margin: "4cqmin auto 0",
        animation: `kFadeUp ${dur}s var(--ease) infinite both` }}>{rich(p.text, p.accent)}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "3.6cqmin", letterSpacing: ".08em",
        textTransform: "uppercase", color: p.accent, textAlign: "center", marginTop: "4cqmin",
        animation: `kFadeUp ${dur}s var(--ease) ${(dur * 0.08).toFixed(2)}s infinite both` }}>— {p.by}</div>
    </div>
  );
}

"use client";
import type { MotionRenderProps } from "@/catalog/types";
import { rich } from "@/catalog/lib/rich-text";

export default function Testimonial({ p, dur }: MotionRenderProps) {
  return (
    <div className="m-center" style={{ alignContent: "center", padding: "9cqmin" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "1.4cqmin", marginBottom: "4cqmin" }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} viewBox="0 0 24 24" width="6cqmin" height="6cqmin" fill={p.accent}
            style={{ animation: `kStar ${dur}s var(--ease) ${(i * dur * 0.05).toFixed(2)}s infinite both` }}>
            <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5 20.4l1.4-6.8L1.3 9l6.9-.8z" />
          </svg>
        ))}
      </div>
      <div style={{ fontWeight: 540, fontSize: "6.6cqmin", lineHeight: 1.25, letterSpacing: "-.02em",
        color: p.color, textAlign: "center", maxWidth: "80cqw", margin: "0 auto",
        animation: `kFadeUp ${dur}s var(--ease) infinite both` }}>{rich(p.text, p.accent)}</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2.4cqmin", marginTop: "5cqmin",
        animation: `kFadeUp ${dur}s var(--ease) ${(dur * 0.1).toFixed(2)}s infinite both` }}>
        <div style={{ width: "7cqmin", height: "7cqmin", borderRadius: "50%", background: p.accent, color: "#0a0a0a",
          display: "grid", placeItems: "center", fontWeight: 700, fontSize: "3.6cqmin" }}>{(p.by || "?").charAt(0)}</div>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontWeight: 600, fontSize: "3.8cqmin", color: p.color }}>{p.by}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "2.9cqmin", color: p.accent }}>{p.role}</div>
        </div>
      </div>
    </div>
  );
}

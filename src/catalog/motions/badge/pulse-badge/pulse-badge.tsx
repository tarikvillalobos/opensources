"use client";
import type { MotionRenderProps } from "@/catalog/types";

export default function PulseBadge({ p, dur }: MotionRenderProps) {
  const ring = (d: number) => (
    <span style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1cqmin solid ${p.accent}`,
      animation: `kPulseRing ${dur}s ease-out ${d}s infinite` }} />
  );
  return (
    <div className="m-center">
      <div style={{ position: "relative", width: "40cqmin", height: "40cqmin", display: "grid", placeItems: "center" }}>
        {ring(0)}{ring(dur * 0.5)}
        <div style={{ width: "40cqmin", height: "40cqmin", borderRadius: "50%", background: p.accent,
          color: p.color, display: "grid", placeItems: "center", textAlign: "center", lineHeight: 1,
          animation: `kBadgeIn ${dur}s var(--ease) infinite both` }}>
          <div>
            <div style={{ fontWeight: 760, fontSize: "9cqmin", letterSpacing: "-.03em" }}>{p.text}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "3cqmin", letterSpacing: ".14em", marginTop: "1cqmin", opacity: 0.8 }}>{p.sub}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

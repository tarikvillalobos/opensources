"use client";
import type { MotionRenderProps } from "@/registry/types";

export default function Steps({ p, dur }: MotionRenderProps) {
  const items = String(p.text || "").split("\n").filter(Boolean);
  return (
    <div className="m-center" style={{ alignContent: "center", padding: "10cqmin" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "3.6cqmin", width: "100%" }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "3.4cqmin", animation: `kFadeUp ${dur}s var(--ease) ${(i * dur * 0.1).toFixed(2)}s infinite both` }}>
            <span style={{ width: "9cqmin", height: "9cqmin", borderRadius: "50%", border: `.6cqmin solid ${p.accent}`, color: p.accent, display: "grid", placeItems: "center", flexShrink: 0, fontWeight: 740, fontSize: "4.4cqmin", fontFamily: "var(--font-mono)" }}>{i + 1}</span>
            <span style={{ fontWeight: 560, fontSize: "5cqmin", color: p.color }}>{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

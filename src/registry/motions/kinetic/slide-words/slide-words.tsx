"use client";
import type { MotionRenderProps } from "@/registry/types";

export default function SlideWords({ p, dur }: MotionRenderProps) {
  const words = String(p.text || "").split(/\s+/).filter(Boolean);
  return (
    <div className="m-center" style={{ alignContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 .3em", fontWeight: 660, fontSize: "13cqmin", letterSpacing: "-.03em", color: p.color, textAlign: "center", lineHeight: 1.05 }}>
        {words.map((w, i) => (
          <span key={i} style={{ display: "inline-block", animation: `${i % 2 ? "kSlideInR" : "kSlideInL"} ${dur}s var(--ease) ${(i * dur * 0.05).toFixed(2)}s infinite both` }}>{w}</span>
        ))}
      </div>
    </div>
  );
}

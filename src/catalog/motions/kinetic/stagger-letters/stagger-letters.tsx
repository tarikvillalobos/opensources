"use client";
import type { MotionRenderProps } from "@/catalog/types";

export default function StaggerLetters({ p, dur }: MotionRenderProps) {
  const ch = String(p.text || "").split("");
  return (
    <div className="m-center">
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", fontWeight: 720, fontSize: "17cqmin", color: p.color, letterSpacing: "-.02em" }}>
        {ch.map((c, i) => (
          <span key={i} style={{ display: "inline-block", whiteSpace: "pre", animation: `kLetterPop ${dur}s var(--ease) ${(i * dur * 0.045).toFixed(2)}s infinite both` }}>{c === " " ? " " : c}</span>
        ))}
      </div>
    </div>
  );
}

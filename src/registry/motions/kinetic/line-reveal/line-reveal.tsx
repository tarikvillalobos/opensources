"use client";
import type { MotionRenderProps } from "@/registry/types";
import { rich } from "@/registry/lib/rich-text";

export default function LineReveal({ p, dur }: MotionRenderProps) {
  const lines = String(p.text || "").split("\n");
  return (
    <div className="m-center" style={{ alignContent: "center", padding: "9cqmin" }}>
      <div style={{ fontWeight: 640, fontSize: "12cqmin", color: p.color, textAlign: "left", lineHeight: 1.1, letterSpacing: "-.02em", width: "100%" }}>
        {lines.map((l, i) => (
          <div key={i} style={{ overflow: "hidden" }}>
            <div style={{ animation: `kWordUp ${dur}s var(--ease) ${(i * dur * 0.08).toFixed(2)}s infinite both` }}>{rich(l, p.accent)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

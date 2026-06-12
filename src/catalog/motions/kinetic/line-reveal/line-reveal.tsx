"use client";
import type { MotionRenderProps } from "@/catalog/types";
import { rich } from "@/catalog/lib/rich-text";
import { lines } from "@/catalog/lib/text";

export default function LineReveal({ p, dur }: MotionRenderProps) {
  const rows = lines(p.text);
  return (
    <div className="m-center" style={{ alignContent: "center", padding: "9cqmin" }}>
      <div style={{ fontWeight: 640, fontSize: "12cqmin", color: p.color, textAlign: "left", lineHeight: 1.1, letterSpacing: "-.02em", width: "100%" }}>
        {rows.map((l, i) => (
          <div key={i} style={{ overflow: "hidden" }}>
            <div style={{ animation: `kWordUp ${dur}s var(--ease) ${(i * dur * 0.08).toFixed(2)}s infinite both` }}>{rich(l, p.accent)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

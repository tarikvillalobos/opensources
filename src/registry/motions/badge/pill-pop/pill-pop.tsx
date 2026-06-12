"use client";
import type { MotionRenderProps } from "@/registry/types";
import { csv } from "@/registry/lib/text";

export default function PillPop({ p, dur }: MotionRenderProps) {
  const items = csv(p.text);
  return (
    <div className="m-center">
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2.4cqmin", maxWidth: "84cqw" }}>
        {items.map((it, i) => (
          <span key={i} style={{ background: i % 2 ? p.color : p.accent, color: i % 2 ? p.bg : "#0a0a0a", padding: "2.4cqmin 4cqmin", borderRadius: "999px", fontWeight: 640, fontSize: "5cqmin", animation: `kPop ${dur}s var(--ease) ${(i * dur * 0.1).toFixed(2)}s infinite both` }}>{it}</span>
        ))}
      </div>
    </div>
  );
}

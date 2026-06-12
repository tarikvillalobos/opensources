"use client";
import type { MotionRenderProps } from "@/registry/types";

export default function TagPop({ p, dur }: MotionRenderProps) {
  return (
    <div className="m-center" style={{ alignContent: "end", padding: "11cqmin" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "2cqmin", padding: "2.6cqmin 4.4cqmin",
        borderRadius: "999px", background: p.accent, color: p.color, fontWeight: 600, fontSize: "5.6cqmin",
        letterSpacing: "-.01em", animation: `kPop ${dur}s var(--ease) infinite both`, boxShadow: "0 4cqmin 10cqmin -4cqmin rgba(0,0,0,.5)" }}>
        <span style={{ width: "2.4cqmin", height: "2.4cqmin", borderRadius: "50%", background: "currentColor", opacity: 0.85 }} />
        {p.text}
      </div>
    </div>
  );
}

"use client";
import type { MotionRenderProps } from "@/registry/types";

export default function LiveBadge({ p, dur }: MotionRenderProps) {
  return (
    <div className="m-center">
      <div style={{ display: "inline-flex", alignItems: "center", gap: "2.4cqmin", background: "#0a0a0a", border: `.5cqmin solid ${p.accent}`, padding: "2.8cqmin 4.6cqmin", borderRadius: "999px", animation: `kPop ${dur}s var(--ease) infinite both` }}>
        <span style={{ position: "relative", width: "4cqmin", height: "4cqmin" }}>
          <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: p.accent }} />
          <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: p.accent, animation: `kPulseRing ${dur * 0.6}s ease-out infinite` }} />
        </span>
        <span style={{ color: "#fff", fontWeight: 760, fontSize: "5cqmin", letterSpacing: ".1em" }}>{p.text}</span>
      </div>
    </div>
  );
}

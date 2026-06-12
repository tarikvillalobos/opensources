"use client";
import type { MotionRenderProps } from "@/registry/types";

export default function Stripes({ p, dur }: MotionRenderProps) {
  return (
    <div className="m-center" style={{ overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(45deg, ${p.accent} 0 8cqmin, transparent 8cqmin 16cqmin)`, animation: `kStripes ${dur}s linear infinite`, opacity: 0.9 }} />
      <div style={{ position: "relative", background: p.bg, padding: "3.4cqmin 6cqmin", borderRadius: "2cqmin", fontWeight: 760, fontSize: "13cqmin", color: p.color, letterSpacing: "-.03em", textAlign: "center" }}>{p.text}</div>
    </div>
  );
}

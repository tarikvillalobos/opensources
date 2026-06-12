"use client";
import type { MotionRenderProps } from "@/catalog/types";

export default function NoiseGradient({ p, dur }: MotionRenderProps) {
  return (
    <div className="m-center" style={{ overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: "-40%", background: `conic-gradient(from 0deg, ${p.accent}, ${p.c2}, ${p.c3}, ${p.accent})`, filter: "blur(10cqmin)", animation: `kSpin ${dur * 3}s linear infinite` }} />
      <div style={{ position: "absolute", fontWeight: 760, fontSize: "16cqmin", color: p.color, textAlign: "center", letterSpacing: "-.04em", opacity: 0.92 }}>{p.text}</div>
    </div>
  );
}

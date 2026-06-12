"use client";
import type { MotionRenderProps } from "@/catalog/types";

export default function Spotlight({ p, dur }: MotionRenderProps) {
  return (
    <div className="m-center" style={{ overflow: "hidden" }}>
      <div style={{ position: "absolute", width: "74cqmin", height: "74cqmin", borderRadius: "50%", background: `radial-gradient(circle, ${p.accent}55, transparent 70%)`, left: "13%", top: "13%", animation: `kSpot ${dur * 2}s ease-in-out infinite` }} />
      <div style={{ position: "relative", fontWeight: 760, fontSize: "15cqmin", color: p.color, textAlign: "center", letterSpacing: "-.03em" }}>{p.text}</div>
    </div>
  );
}

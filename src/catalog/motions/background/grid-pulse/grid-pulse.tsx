"use client";
import type { MotionRenderProps } from "@/catalog/types";

export default function GridPulse({ p, dur }: MotionRenderProps) {
  const N = 8;
  const dots: [number, number][] = [];
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) dots.push([r, c]);
  return (
    <div className="m-center" style={{ overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: "7cqmin", display: "grid", gridTemplateColumns: `repeat(${N},1fr)`, gridTemplateRows: `repeat(${N},1fr)`, placeItems: "center" }}>
        {dots.map(([r, c], i) => <span key={i} style={{ width: "1.5cqmin", height: "1.5cqmin", borderRadius: "50%", background: p.accent, animation: `kGridDot ${dur}s ease-in-out ${((r + c) * 0.06).toFixed(2)}s infinite` }} />)}
      </div>
      <div style={{ position: "relative", fontWeight: 740, fontSize: "15cqmin", color: p.color, textAlign: "center", letterSpacing: "-.03em" }}>{p.text}</div>
    </div>
  );
}

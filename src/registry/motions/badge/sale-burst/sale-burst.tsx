"use client";
import type { MotionRenderProps } from "@/registry/types";

export default function SaleBurst({ p, dur }: MotionRenderProps) {
  const spikes = 12;
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const a = (i / (spikes * 2)) * Math.PI * 2;
    const rad = i % 2 ? 33 : 48;
    pts.push(`${(50 + Math.cos(a) * rad).toFixed(1)}% ${(50 + Math.sin(a) * rad).toFixed(1)}%`);
  }
  return (
    <div className="m-center">
      <div style={{ position: "relative", width: "50cqmin", height: "50cqmin", display: "grid", placeItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: p.accent, clipPath: `polygon(${pts.join(",")})`, animation: `kSpin ${dur * 6}s linear infinite` }} />
        <div style={{ position: "relative", textAlign: "center", color: p.color, fontWeight: 820, lineHeight: 0.9, animation: `kBeat ${dur}s ease-in-out infinite` }}>
          <div style={{ fontSize: "11cqmin", letterSpacing: "-.04em" }}>{p.text}</div>
          <div style={{ fontSize: "4cqmin", fontWeight: 600, marginTop: "1cqmin" }}>{p.sub}</div>
        </div>
      </div>
    </div>
  );
}

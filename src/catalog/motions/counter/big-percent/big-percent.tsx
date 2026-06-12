"use client";
import type { MotionRenderProps } from "@/catalog/types";
import { useLoop, easeOut } from "@/catalog/lib/use-motion-timing";

export default function BigPercent({ p, dur }: MotionRenderProps) {
  const t = useLoop(dur);
  const target = parseFloat(p.value) || 0;
  const val = target * (t < 0.6 ? easeOut(t / 0.6) : 1);
  return (
    <div className="m-center">
      <div style={{ position: "relative", width: "54cqmin", height: "54cqmin", borderRadius: "50%", display: "grid", placeItems: "center",
        background: `conic-gradient(${p.accent} ${val * 3.6}deg, rgba(128,128,128,.18) 0deg)` }}>
        <div style={{ width: "42cqmin", height: "42cqmin", borderRadius: "50%", background: p.bg, display: "grid", placeItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 740, fontSize: "14cqmin", color: p.color, fontFamily: "var(--font-mono)", letterSpacing: "-.03em" }}>{Math.round(val)}%</div>
            <div style={{ fontSize: "3.2cqmin", color: p.color, opacity: 0.7, marginTop: "1cqmin" }}>{p.label}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

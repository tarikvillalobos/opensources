"use client";
import type { MotionRenderProps } from "@/catalog/types";
import { useLoop, easeOut, fmtNum } from "@/catalog/lib/use-motion-timing";

export default function Odometer({ p, dur }: MotionRenderProps) {
  const t = useLoop(dur);
  const target = parseFloat(p.value) || 0;
  const val = target * (t < 0.7 ? easeOut(t / 0.7) : 1);
  return (
    <div className="m-center">
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "4cqmin", letterSpacing: ".16em", textTransform: "uppercase", color: p.accent, marginBottom: "3cqmin" }}>{p.label}</div>
        <div style={{ fontWeight: 760, fontSize: "20cqmin", color: p.color, fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", letterSpacing: "-.02em" }}>{p.prefix}{fmtNum(val)}</div>
      </div>
    </div>
  );
}

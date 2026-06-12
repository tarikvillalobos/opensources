"use client";
import type { MotionRenderProps } from "@/catalog/types";
import { useLoop, easeOut, fmtNum } from "@/catalog/lib/use-motion-timing";

export default function CountUp({ p, dur }: MotionRenderProps) {
  const t = useLoop(dur);
  const target = parseFloat(p.value) || 0;
  const prog = t < 0.6 ? easeOut(t / 0.6) : 1;
  const val = target * prog;
  return (
    <div className="m-center">
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", color: p.color,
          fontWeight: 700, letterSpacing: "-.04em", lineHeight: 0.9 }}>
          <span style={{ fontSize: "7cqmin", color: p.accent, marginRight: "1cqmin" }}>{p.prefix}</span>
          <span style={{ fontSize: "24cqmin", fontVariantNumeric: "tabular-nums", fontFamily: "var(--font-mono)" }}>{fmtNum(val)}</span>
          <span style={{ fontSize: "10cqmin", color: p.accent, marginLeft: "1cqmin" }}>{p.suffix}</span>
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "4cqmin", letterSpacing: ".1em",
          textTransform: "uppercase", color: p.color, opacity: 0.7, marginTop: "3cqmin" }}>{p.label}</div>
      </div>
    </div>
  );
}

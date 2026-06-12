"use client";
import React from "react";
import type { MotionRenderProps } from "@/catalog/types";
import { useLoop, easeOut, fmtNum } from "@/catalog/lib/use-motion-timing";

export default function Comparison({ p, dur }: MotionRenderProps) {
  const t = useLoop(dur);
  const pr = t < 0.6 ? easeOut(t / 0.6) : 1;
  const cols: [string, number, string][] = [
    [p.l1, (parseFloat(p.v1) || 0) * pr, p.accent],
    [p.l2, (parseFloat(p.v2) || 0) * pr, p.color],
  ];
  return (
    <div className="m-center">
      <div style={{ display: "flex", alignItems: "center", gap: "6cqmin" }}>
        {cols.map((c, i) => (
          <React.Fragment key={i}>
            {i === 1 && <div style={{ fontWeight: 700, fontSize: "7cqmin", color: p.color, opacity: 0.35 }}>vs</div>}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 760, fontSize: "16cqmin", color: c[2], fontFamily: "var(--font-mono)", letterSpacing: "-.03em" }}>{fmtNum(c[1])}</div>
              <div style={{ fontSize: "3.4cqmin", color: p.color, opacity: 0.7, marginTop: "1cqmin", textTransform: "uppercase", letterSpacing: ".08em" }}>{c[0]}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

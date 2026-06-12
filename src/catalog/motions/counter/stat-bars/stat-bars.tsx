"use client";
import type { MotionRenderProps } from "@/catalog/types";
import { useLoop, easeOut } from "@/catalog/lib/use-motion-timing";

export default function StatBars({ p, dur }: MotionRenderProps) {
  const t = useLoop(dur);
  const prog = t < 0.55 ? easeOut(t / 0.55) : 1;
  const rows: [string, number][] = [[p.l1, +p.v1 || 0], [p.l2, +p.v2 || 0], [p.l3, +p.v3 || 0]];
  return (
    <div className="m-center" style={{ alignContent: "center", padding: "11cqmin" }}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "5cqmin" }}>
        {rows.map(([label, v], i) => (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.8cqmin", color: p.color }}>
              <span style={{ fontSize: "4.4cqmin", fontWeight: 540 }}>{label}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "4.4cqmin", fontWeight: 600 }}>{Math.round(v * prog)}%</span>
            </div>
            <div style={{ height: "3.2cqmin", borderRadius: "999px", background: "rgba(128,128,128,.22)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: v * prog + "%", borderRadius: "999px",
                background: i === 0 ? p.accent : p.color, opacity: i === 0 ? 1 : 0.55 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import type { MotionRenderProps } from "@/catalog/types";
import { useLoop, easeOut, fmtNum } from "@/catalog/lib/use-motion-timing";

export default function LikeBurst({ p, dur }: MotionRenderProps) {
  const t = useLoop(dur);
  const cnt = Math.round((parseFloat(p.value) || 0) * (t < 0.5 ? easeOut(t / 0.5) : 1));
  return (
    <div className="m-center">
      <div style={{ display: "flex", alignItems: "center", gap: "3cqmin" }}>
        <svg viewBox="0 0 24 24" width="16cqmin" height="16cqmin" fill={p.accent} style={{ animation: `kBeat ${dur}s ease-in-out infinite` }}>
          <path d="M12 21s-7-4.5-9.2-8.2C1.2 10 2.5 6 6 6c2 0 3.2 1.4 4 2.6C10.8 7.4 12 6 14 6c3.5 0 4.8 4 3.2 6.8C19 16.5 12 21 12 21z" />
        </svg>
        <div style={{ fontWeight: 740, fontSize: "11cqmin", color: p.color, fontFamily: "var(--font-mono)" }}>{fmtNum(cnt)}</div>
      </div>
    </div>
  );
}

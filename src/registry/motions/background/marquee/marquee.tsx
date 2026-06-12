"use client";
import type { MotionRenderProps } from "@/registry/types";

export default function Marquee({ p, dur }: MotionRenderProps) {
  const band = (text: string, anim: string, bg: string, fg: string, rot: number) => (
    <div style={{ transform: `rotate(${rot}deg)`, width: "140%", marginLeft: "-20%", background: bg,
      padding: "2.4cqmin 0", overflow: "hidden", whiteSpace: "nowrap" }}>
      <div style={{ display: "inline-flex", animation: `${anim} ${dur * 2.4}s linear infinite` }}>
        {[0, 1].map((k) => (
          <span key={k} style={{ fontWeight: 720, fontSize: "8.6cqmin", letterSpacing: "-.02em", color: fg, paddingRight: "4cqmin" }}>
            {Array(4).fill(text).map((s, j) => <span key={j} style={{ paddingRight: "4cqmin" }}>{s} ✦</span>)}
          </span>
        ))}
      </div>
    </div>
  );
  return (
    <div className="m-center" style={{ alignContent: "center", gap: "3cqmin", overflow: "hidden" }}>
      {band(p.text, "kMarqL", p.accent, "#0a0a0a", -4)}
      {band(p.text2, "kMarqR", "transparent", p.color, 4)}
    </div>
  );
}

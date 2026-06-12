"use client";
import type { MotionRenderProps } from "@/catalog/types";

export default function CaptionBar({ p, dur }: MotionRenderProps) {
  return (
    <div className="m-center" style={{ alignContent: "end", justifyItems: "start", padding: "9cqmin" }}>
      <div style={{ display: "inline-flex", alignItems: "stretch", overflow: "hidden" }}>
        <div style={{ width: "1.4cqmin", background: p.accent, marginRight: "2.4cqmin",
          animation: `kBarIn ${dur}s var(--ease) infinite both` }} />
        <div style={{ animation: `kBarText ${dur}s var(--ease) infinite both` }}>
          <div style={{ fontWeight: 640, fontSize: "7.4cqmin", letterSpacing: "-.02em", color: p.color, lineHeight: 1.05 }}>{p.name}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "3.5cqmin", letterSpacing: ".06em",
            textTransform: "uppercase", color: p.accent, marginTop: "1.4cqmin" }}>{p.role}</div>
        </div>
      </div>
    </div>
  );
}

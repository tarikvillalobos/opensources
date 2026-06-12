"use client";
import type { MotionRenderProps } from "@/catalog/types";

export default function LocationTag({ p, dur }: MotionRenderProps) {
  return (
    <div className="m-center" style={{ alignContent: "center" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "2cqmin", background: p.accent, color: p.color, padding: "2.6cqmin 4.4cqmin", borderRadius: "999px", fontWeight: 640, fontSize: "5.2cqmin", animation: `kPop ${dur}s var(--ease) infinite both` }}>
        <svg viewBox="0 0 24 24" width="5cqmin" height="5cqmin" fill="currentColor"><path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" /></svg>
        {p.text}
      </div>
    </div>
  );
}

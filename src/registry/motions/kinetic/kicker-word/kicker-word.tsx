"use client";
import type { MotionRenderProps } from "@/registry/types";

export default function KickerWord({ p, dur }: MotionRenderProps) {
  return (
    <div className="m-center">
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "4cqmin", letterSpacing: ".2em", textTransform: "uppercase", color: p.accent, marginBottom: "2.4cqmin", animation: `kFadeUp ${dur}s var(--ease) infinite both` }}>{p.kicker}</div>
        <div style={{ fontWeight: 760, fontSize: "20cqmin", letterSpacing: "-.04em", color: p.color, lineHeight: 0.92, animation: `kPunch ${dur}s var(--ease) infinite both` }}>{p.text}</div>
      </div>
    </div>
  );
}

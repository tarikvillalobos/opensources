"use client";
import type { MotionRenderProps } from "@/registry/types";

export default function HighlightSweep({ p, dur }: MotionRenderProps) {
  return (
    <div className="m-center">
      <div style={{ fontWeight: 620, fontSize: "12cqmin", color: p.color, textAlign: "center", lineHeight: 1.18, letterSpacing: "-.02em", maxWidth: "84cqw" }}>
        {p.pre}{" "}
        <span style={{ position: "relative", display: "inline-block" }}>
          <span style={{ position: "absolute", left: "-.12em", right: "-.12em", top: ".08em", bottom: ".04em", background: p.accent, borderRadius: ".1em", transformOrigin: "left", animation: `kSweep ${dur}s var(--ease) infinite both` }} />
          <span style={{ position: "relative", color: p.ink }}>{p.word}</span>
        </span>{" "}{p.post}
      </div>
    </div>
  );
}

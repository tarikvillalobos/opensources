"use client";
import type { MotionRenderProps } from "@/registry/types";
import { useLoop, easeOut } from "@/registry/lib/use-motion-timing";

export default function TypeWriter({ p, dur }: MotionRenderProps) {
  const t = useLoop(dur);
  const txt = String(p.text || "");
  const n = t < 0.7 ? Math.floor(easeOut(t / 0.7) * txt.length) : t < 0.92 ? txt.length : 0;
  return (
    <div className="m-center">
      <div style={{ fontWeight: 600, fontSize: "10cqmin", color: p.color, textAlign: "center", lineHeight: 1.2, letterSpacing: "-.01em", maxWidth: "86cqw" }}>
        {txt.slice(0, n)}<span style={{ color: p.accent, animation: "kBlink 1s step-end infinite" }}>|</span>
      </div>
    </div>
  );
}

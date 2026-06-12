"use client";
import type { MotionRenderProps } from "@/registry/types";
import { useStep } from "@/registry/lib/use-motion-timing";

export default function FlipWords({ p, dur }: MotionRenderProps) {
  const opts = String(p.words || "").split(",").map((s) => s.trim()).filter(Boolean);
  const i = useStep(opts.length || 1, dur * 0.6);
  return (
    <div className="m-center">
      <div style={{ fontWeight: 660, fontSize: "12cqmin", color: p.color, textAlign: "center", letterSpacing: "-.02em", perspective: "600px" }}>
        {p.pre}{" "}
        <span key={i} style={{ display: "inline-block", color: p.accent, transformStyle: "preserve-3d", animation: `kFlip ${dur * 0.6}s var(--ease) both` }}>{opts[i % (opts.length || 1)]}</span>
      </div>
    </div>
  );
}

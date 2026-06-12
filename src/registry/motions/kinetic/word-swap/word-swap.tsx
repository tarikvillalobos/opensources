"use client";
import type { MotionRenderProps } from "@/registry/types";
import { useStep } from "@/registry/lib/use-motion-timing";

export default function WordSwap({ p, dur }: MotionRenderProps) {
  const opts = String(p.words || "").split(",").map((s) => s.trim()).filter(Boolean);
  const i = useStep(opts.length || 1, dur * 0.55);
  return (
    <div className="m-center">
      <div style={{ fontWeight: 600, fontSize: "11cqmin", lineHeight: 1.1, letterSpacing: "-.02em",
        color: p.color, textAlign: "center", maxWidth: "86cqw" }}>
        {p.pre}{" "}
        <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", position: "relative" }}>
          <span key={i} style={{ display: "inline-block", color: p.accent,
            animation: `kSwap ${dur * 0.55}s var(--ease) both` }}>{opts[i % (opts.length || 1)]}</span>
        </span>{" "}{p.post}
      </div>
    </div>
  );
}

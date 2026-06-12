"use client";
import type { MotionRenderProps } from "@/registry/types";
import { rich } from "@/registry/lib/rich-text";

export default function PunchIn({ p, dur }: MotionRenderProps) {
  return (
    <div className="m-center">
      <div style={{ fontWeight: 680, fontSize: "17cqmin", lineHeight: 0.96, letterSpacing: "-.04em",
        color: p.color, textAlign: "center", animation: `kPunch ${dur}s var(--ease) infinite both` }}>
        {rich(p.text, p.accent || p.color)}
      </div>
    </div>
  );
}

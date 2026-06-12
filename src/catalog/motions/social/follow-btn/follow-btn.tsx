"use client";
import type { MotionRenderProps } from "@/catalog/types";
import { useStep } from "@/catalog/lib/use-motion-timing";

export default function FollowBtn({ p, dur }: MotionRenderProps) {
  const following = useStep(2, dur * 0.5) === 1;
  return (
    <div className="m-center">
      <div style={{ display: "inline-flex", alignItems: "center", gap: "2cqmin", background: following ? "transparent" : p.accent, color: following ? p.color : "#0a0a0a",
        border: `.6cqmin solid ${following ? p.color : p.accent}`, padding: "3cqmin 6cqmin", borderRadius: "999px", fontWeight: 700, fontSize: "5.4cqmin", transition: "all .3s var(--ease)" }}>
        {following ? "✓ " : ""}{following ? p.text2 : p.text}
      </div>
    </div>
  );
}

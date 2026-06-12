"use client";
import type { MotionRenderProps } from "@/catalog/types";

export default function GradientText({ p, dur }: MotionRenderProps) {
  return (
    <div className="m-center">
      <div style={{ fontWeight: 760, fontSize: "18cqmin", letterSpacing: "-.04em", lineHeight: 0.95, textAlign: "center", padding: "6cqmin",
        background: `linear-gradient(100deg, ${p.accent}, ${p.c2}, ${p.accent})`, backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", animation: `kShine ${dur}s linear infinite` }}>{p.text}</div>
    </div>
  );
}

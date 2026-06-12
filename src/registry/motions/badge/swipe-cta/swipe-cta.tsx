"use client";
import type { MotionRenderProps } from "@/registry/types";

export default function SwipeCTA({ p, dur }: MotionRenderProps) {
  return (
    <div className="m-center" style={{ alignContent: "center" }}>
      <svg viewBox="0 0 24 24" width="11cqmin" height="11cqmin" fill="none" stroke={p.accent} strokeWidth="2.4"
        strokeLinecap="round" strokeLinejoin="round" style={{ animation: `kArrow ${dur}s ease-in-out infinite` }}>
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
      <div style={{ marginTop: "4cqmin", fontWeight: 640, fontSize: "9cqmin", letterSpacing: "-.02em",
        background: `linear-gradient(100deg, ${p.color} 30%, ${p.accent} 50%, ${p.color} 70%)`,
        backgroundSize: "220% 100%", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
        animation: `kShine ${dur}s linear infinite` }}>{p.text}</div>
    </div>
  );
}

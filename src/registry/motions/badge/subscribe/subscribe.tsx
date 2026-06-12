"use client";
import type { MotionRenderProps } from "@/registry/types";

export default function Subscribe({ p, dur }: MotionRenderProps) {
  return (
    <div className="m-center">
      <div style={{ display: "flex", alignItems: "center", gap: "3cqmin", animation: `kPop ${dur}s var(--ease) infinite both` }}>
        <div style={{ background: p.accent, color: "#0a0a0a", padding: "3cqmin 5cqmin", borderRadius: "2cqmin", fontWeight: 720, fontSize: "5.4cqmin" }}>{p.text}</div>
        <svg viewBox="0 0 24 24" width="9cqmin" height="9cqmin" fill={p.color} style={{ transformOrigin: "top center", animation: `kShake ${dur}s ease-in-out infinite` }}>
          <path d="M12 2a2 2 0 00-2 2v.6A6 6 0 006 10v4l-2 2v1h16v-1l-2-2v-4a6 6 0 00-4-5.4V4a2 2 0 00-2-2zm0 20a2.5 2.5 0 002.5-2.5h-5A2.5 2.5 0 0012 22z" />
        </svg>
      </div>
    </div>
  );
}

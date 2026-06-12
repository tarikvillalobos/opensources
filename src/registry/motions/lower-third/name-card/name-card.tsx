"use client";
import type { MotionRenderProps } from "@/registry/types";

export default function NameCard({ p, dur }: MotionRenderProps) {
  return (
    <div className="m-center" style={{ alignContent: "end", justifyItems: "start", padding: "9cqmin" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "3cqmin", animation: `kSlideInL ${dur}s var(--ease) infinite both` }}>
        <div style={{ width: "12cqmin", height: "12cqmin", borderRadius: "50%", background: p.accent, color: "#0a0a0a", display: "grid", placeItems: "center", fontWeight: 740, fontSize: "5cqmin", flexShrink: 0 }}>{(p.name || "?").charAt(0)}</div>
        <div>
          <div style={{ fontWeight: 680, fontSize: "6.4cqmin", color: p.color, letterSpacing: "-.02em" }}>{p.name}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "3.4cqmin", color: p.accent }}>{p.handle}</div>
        </div>
      </div>
    </div>
  );
}

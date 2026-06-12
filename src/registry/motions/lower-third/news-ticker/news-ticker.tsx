"use client";
import type { MotionRenderProps } from "@/registry/types";

export default function NewsTicker({ p, dur }: MotionRenderProps) {
  return (
    <div className="m-center" style={{ alignContent: "end" }}>
      <div style={{ width: "100%", display: "flex", alignItems: "stretch", background: "#0a0a0a", borderTop: `.6cqmin solid ${p.accent}` }}>
        <div style={{ background: p.accent, color: "#0a0a0a", fontWeight: 780, fontSize: "4cqmin", padding: "2.6cqmin 3cqmin", letterSpacing: ".06em", whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>{p.label}</div>
        <div style={{ overflow: "hidden", flex: 1, display: "flex", alignItems: "center" }}>
          <div style={{ whiteSpace: "nowrap", display: "inline-block", color: "#fff", fontWeight: 520, fontSize: "4.4cqmin", animation: `kMarqL ${dur * 3}s linear infinite` }}>
            {[0, 1].map((k) => <span key={k} style={{ paddingRight: "8cqmin" }}>{p.text}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import type { MotionRenderProps } from "@/registry/types";

export default function MeshFlow({ p, dur }: MotionRenderProps) {
  const blob = (anim: string, color: string, x: string, y: string, s: string) => (
    <div style={{ position: "absolute", left: x, top: y, width: s, height: s, borderRadius: "50%",
      background: color, filter: "blur(14cqmin)", animation: `${anim} ${dur * 2}s ease-in-out infinite` }} />
  );
  return (
    <div className="m-center" style={{ overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: "-20%" }}>
        {blob("kMesh1", p.accent, "5%", "8%", "55cqmin")}
        {blob("kMesh2", p.c2, "50%", "40%", "60cqmin")}
        {blob("kMesh3", p.c3, "20%", "55%", "50cqmin")}
      </div>
      <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(2cqmin)" }} />
      <div style={{ position: "relative", fontWeight: 680, fontSize: "14cqmin", lineHeight: 0.98,
        letterSpacing: "-.04em", color: p.color, textAlign: "center", mixBlendMode: "overlay", padding: "8cqmin" }}>{p.text}</div>
      <div style={{ position: "absolute", fontWeight: 680, fontSize: "14cqmin", lineHeight: 0.98,
        letterSpacing: "-.04em", color: p.color, textAlign: "center", padding: "8cqmin", opacity: 0.9 }}>{p.text}</div>
    </div>
  );
}

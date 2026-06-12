"use client";
import type { MotionRenderProps } from "@/catalog/types";

export default function NotifyToast({ p, dur }: MotionRenderProps) {
  return (
    <div className="m-center" style={{ alignContent: "start", padding: "8cqmin" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "3cqmin", background: "#fff", borderRadius: "3.4cqmin", padding: "3.4cqmin 4cqmin", width: "100%", boxShadow: "0 6cqmin 14cqmin -6cqmin rgba(0,0,0,.5)", animation: `kSlideDown ${dur}s var(--ease) infinite both` }}>
        <div style={{ width: "10cqmin", height: "10cqmin", borderRadius: "2.6cqmin", background: p.accent, display: "grid", placeItems: "center", flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" width="5.4cqmin" height="5.4cqmin" fill="#0a0a0a"><path d="M12 2a7 7 0 00-7 7v4l-2 2v1h18v-1l-2-2V9a7 7 0 00-7-7zm0 20a2.5 2.5 0 002.5-2.5h-5A2.5 2.5 0 0012 22z" /></svg>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: "4cqmin", color: "#0a0a0a" }}>{p.title}</div>
          <div style={{ fontSize: "3.4cqmin", color: "#555", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.text}</div>
        </div>
      </div>
    </div>
  );
}

"use client";
import type { MotionRenderProps } from "@/catalog/types";
import { rich } from "@/catalog/lib/rich-text";

export default function TweetCard({ p, dur }: MotionRenderProps) {
  return (
    <div className="m-center" style={{ padding: "8cqmin" }}>
      <div style={{ width: "100%", background: "#fff", borderRadius: "4cqmin", padding: "5cqmin", boxShadow: "0 6cqmin 16cqmin -6cqmin rgba(0,0,0,.55)", animation: `kPop ${dur}s var(--ease) infinite both` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2.6cqmin", marginBottom: "3cqmin" }}>
          <div style={{ width: "9cqmin", height: "9cqmin", borderRadius: "50%", background: p.accent, color: "#fff", display: "grid", placeItems: "center", fontWeight: 740, fontSize: "4.2cqmin" }}>{(p.name || "?").charAt(0)}</div>
          <div><div style={{ fontWeight: 700, fontSize: "4cqmin", color: "#0f1419" }}>{p.name}</div><div style={{ fontSize: "3.2cqmin", color: "#536471" }}>{p.handle}</div></div>
        </div>
        <div style={{ fontSize: "5cqmin", color: "#0f1419", lineHeight: 1.3 }}>{rich(p.text, p.accent)}</div>
      </div>
    </div>
  );
}

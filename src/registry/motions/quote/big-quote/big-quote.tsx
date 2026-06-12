"use client";
import type { MotionRenderProps } from "@/registry/types";
import { rich } from "@/registry/lib/rich-text";
import { lines } from "@/registry/lib/text";

export default function BigQuote({ p, dur }: MotionRenderProps) {
  const rows = lines(p.text);
  return (
    <div className="m-center" style={{ alignContent: "center", justifyItems: "start", padding: "11cqmin" }}>
      <div style={{ fontWeight: 600, fontSize: "13cqmin", color: p.color, lineHeight: 1.08, letterSpacing: "-.03em", textAlign: "left" }}>
        {rows.map((l, i) => (
          <div key={i} style={{ overflow: "hidden" }}>
            <div style={{ animation: `kWordUp ${dur}s var(--ease) ${(i * dur * 0.07).toFixed(2)}s infinite both` }}>{rich(l, p.accent)}</div>
          </div>
        ))}
      </div>
      <div style={{ height: ".7cqmin", width: "14cqmin", background: p.accent, marginTop: "5cqmin", transformOrigin: "left", animation: `kSweep ${dur}s var(--ease) infinite both` }} />
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "3.4cqmin", letterSpacing: ".1em", textTransform: "uppercase", color: p.color, opacity: 0.65, marginTop: "3cqmin" }}>{p.by}</div>
    </div>
  );
}

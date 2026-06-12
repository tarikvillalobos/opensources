"use client";
import type { MotionRenderProps } from "@/registry/types";
import { lines } from "@/registry/lib/text";

export default function ChatBubble({ p, dur }: MotionRenderProps) {
  const msgs = lines(p.text, true);
  return (
    <div className="m-center" style={{ alignContent: "center", padding: "8cqmin" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "2.4cqmin", width: "100%" }}>
        {msgs.map((m, i) => {
          const me = i % 2 === 1;
          return (
            <div key={i} style={{ alignSelf: me ? "flex-end" : "flex-start", maxWidth: "76%", background: me ? p.accent : "#23262d", color: me ? "#0a0a0a" : "#fff",
              padding: "2.8cqmin 3.6cqmin", borderRadius: "4cqmin", borderBottomRightRadius: me ? ".6cqmin" : "4cqmin", borderBottomLeftRadius: me ? "4cqmin" : ".6cqmin",
              fontSize: "4.2cqmin", fontWeight: 500, animation: `kPop ${dur}s var(--ease) ${(i * dur * 0.12).toFixed(2)}s infinite both` }}>{m}</div>
          );
        })}
      </div>
    </div>
  );
}

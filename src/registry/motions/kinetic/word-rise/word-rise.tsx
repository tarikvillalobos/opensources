"use client";
import type { MotionRenderProps } from "@/registry/types";
import { lines } from "@/registry/lib/text";

export default function WordRise({ p, dur }: MotionRenderProps) {
  const accent = p.accent || p.color;
  const rows = lines(p.text);
  let idx = 0;
  return (
    <div className="m-center" style={{ alignContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: ".08em", alignItems: "center",
        fontWeight: 600, fontSize: "13cqmin", lineHeight: 1.02, letterSpacing: "-.03em",
        color: p.color, textAlign: "center" }}>
        {rows.map((line, li) => {
          let hl = false;
          return (
            <div key={li} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 .28em" }}>
              {line.split(/\s+/).filter(Boolean).map((tok, wi) => {
                let word = tok; const start = word.startsWith("*"); const end = word.endsWith("*");
                if (start) { word = word.slice(1); hl = true; }
                const thisHi = hl;
                if (end) word = word.slice(0, -1);
                const delay = (idx++ * dur * 0.06).toFixed(2);
                const node = (
                  <span key={wi} style={{ overflow: "hidden", display: "inline-block", paddingBottom: ".06em" }}>
                    <span style={{ display: "inline-block", color: thisHi ? accent : "inherit",
                      animation: `kWordUp ${dur}s var(--ease) ${delay}s infinite both` }}>{word}</span>
                  </span>
                );
                if (end) hl = false;
                return node;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

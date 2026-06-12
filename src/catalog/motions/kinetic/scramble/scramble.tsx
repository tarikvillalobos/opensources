"use client";
import type { MotionRenderProps } from "@/catalog/types";
import { useLoop, easeOut } from "@/catalog/lib/use-motion-timing";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*0123456789";

export default function Scramble({ p, dur }: MotionRenderProps) {
  const t = useLoop(dur);
  const txt = String(p.text || "");
  const reveal = t < 0.55 ? easeOut(t / 0.55) : t < 0.9 ? 1 : 0;
  const shown = txt.split("").map((ch, i) => {
    if (ch === " ") return " ";
    const threshold = (i + 1) / txt.length;
    if (reveal >= threshold) return ch;
    if (reveal <= 0) return " ";
    return GLYPHS[(Math.floor(t * 90) + i * 7) % GLYPHS.length];
  }).join("");
  return (
    <div className="m-center">
      <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "11cqmin",
        letterSpacing: "-.01em", color: p.color, textAlign: "center", lineHeight: 1.1 }}>
        {shown}<span style={{ color: p.accent, animation: "kBlink 1s step-end infinite" }}>_</span>
      </div>
    </div>
  );
}

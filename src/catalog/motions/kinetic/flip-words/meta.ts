import type { MotionMeta } from "@/catalog/types";
import { text, color, bg } from "@/catalog/lib/fields";
import FlipWords from "./flip-words";

export const meta: MotionMeta = {
  id: "flip-words", name: "Flip Words", category: "kinetic",
  base: 4.4, format: "square", Comp: FlipWords,
  fields: [text("pre", "before"), text("words", "words"), color("color", "text"), color("accent", "highlight"), bg()],
  defaults: { pre: "somos", words: "rápidos,ousados,abertos", color: "#ffffff", accent: "#c8ff2d", bg: "#111317" },
};

import type { MotionMeta } from "@/registry/types";
import { area, color, bg } from "@/registry/lib/fields";
import WordRise from "./word-rise";

export const meta: MotionMeta = {
  id: "word-rise", name: "Word Rise", category: "kinetic",
  base: 3.6, format: "square", rich: true, Comp: WordRise,
  fields: [area("text", "text"), color("color", "textColor"), color("accent", "highlight"), bg()],
  defaults: { text: "ideias que *se movem*", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

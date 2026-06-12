import type { MotionMeta } from "@/catalog/types";
import { area, color, bg } from "@/catalog/lib/fields";
import LineReveal from "./line-reveal";

export const meta: MotionMeta = {
  id: "line-reveal", name: "Line Reveal", category: "kinetic",
  base: 4.2, format: "square", rich: true, Comp: LineReveal,
  fields: [area("text", "textLines"), color("color", "text"), color("accent", "highlight"), bg()],
  defaults: { text: "menos\né\n*mais*", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

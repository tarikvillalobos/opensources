import type { MotionMeta } from "@/registry/types";
import { area, color, bg } from "@/registry/lib/fields";
import GradientText from "./gradient-text";

export const meta: MotionMeta = {
  id: "gradient-text", name: "Gradient Text", category: "kinetic",
  base: 4, format: "square", Comp: GradientText,
  fields: [area("text", "text"), color("accent", "color1"), color("c2", "color2"), bg()],
  defaults: { text: "fluido", accent: "#c8ff2d", c2: "#5b8cff", color: "#ffffff", bg: "#0a0a0a" },
};

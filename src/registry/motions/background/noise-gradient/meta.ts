import type { MotionMeta } from "@/registry/types";
import { text, color, bg } from "@/registry/lib/fields";
import NoiseGradient from "./noise-gradient";

export const meta: MotionMeta = {
  id: "noise-gradient", name: "Noise Gradient", category: "background",
  base: 4, format: "story", Comp: NoiseGradient,
  fields: [text("text", "text"), color("color", "text"), color("accent", "color1"), color("c2", "color2"), color("c3", "color3"), bg()],
  defaults: { text: "energia", color: "#ffffff", accent: "#c8ff2d", c2: "#5b8cff", c3: "#ff4d8d", bg: "#0a0a0a" },
};

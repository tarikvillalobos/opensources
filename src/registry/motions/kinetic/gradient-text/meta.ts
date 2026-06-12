import type { MotionMeta } from "@/registry/types";
import GradientText from "./gradient-text";

export const meta: MotionMeta = {
  id: "gradient-text",
  name: "Gradient Text",
  category: "kinetic",
  base: 4,
  format: "square",
  Comp: GradientText,
  fields: [
    { key: "text", labelKey: "text", type: "area" },
    { key: "accent", labelKey: "color1", type: "color" },
    { key: "c2", labelKey: "color2", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "fluido", accent: "#c8ff2d", c2: "#5b8cff", color: "#ffffff", bg: "#0a0a0a" },
};

import type { MotionMeta } from "@/registry/types";
import LineReveal from "./line-reveal";

export const meta: MotionMeta = {
  id: "line-reveal",
  name: "Line Reveal",
  category: "kinetic",
  base: 4.2,
  format: "square",
  rich: true,
  Comp: LineReveal,
  fields: [
    { key: "text", labelKey: "textLines", type: "area" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "highlight", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "menos\né\n*mais*", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

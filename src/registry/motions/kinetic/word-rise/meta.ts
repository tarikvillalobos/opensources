import type { MotionMeta } from "@/registry/types";
import WordRise from "./word-rise";

export const meta: MotionMeta = {
  id: "word-rise",
  name: "Word Rise",
  category: "kinetic",
  base: 3.6,
  format: "square",
  rich: true,
  Comp: WordRise,
  fields: [
    { key: "text", labelKey: "text", type: "area" },
    { key: "color", labelKey: "textColor", type: "color" },
    { key: "accent", labelKey: "highlight", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "ideias que *se movem*", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

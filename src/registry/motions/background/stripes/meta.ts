import type { MotionMeta } from "@/registry/types";
import Stripes from "./stripes";

export const meta: MotionMeta = {
  id: "stripes",
  name: "Stripes",
  category: "background",
  base: 5,
  format: "square",
  Comp: Stripes,
  fields: [
    { key: "text", labelKey: "text", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "stripes", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "ATENÇÃO", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

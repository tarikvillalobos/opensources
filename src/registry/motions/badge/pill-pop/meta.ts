import type { MotionMeta } from "@/registry/types";
import PillPop from "./pill-pop";

export const meta: MotionMeta = {
  id: "pill-pop",
  name: "Pill Pop",
  category: "badge",
  base: 3.4,
  format: "square",
  Comp: PillPop,
  fields: [
    { key: "text", labelKey: "tags", type: "area" },
    { key: "color", labelKey: "colorB", type: "color" },
    { key: "accent", labelKey: "colorA", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "design, motion, código, open", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

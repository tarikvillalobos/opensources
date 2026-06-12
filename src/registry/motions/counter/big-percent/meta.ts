import type { MotionMeta } from "@/registry/types";
import BigPercent from "./big-percent";

export const meta: MotionMeta = {
  id: "big-percent",
  name: "Big Percent",
  category: "counter",
  base: 4,
  format: "square",
  Comp: BigPercent,
  fields: [
    { key: "value", labelKey: "percent", type: "text" },
    { key: "label", labelKey: "caption", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "ring", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { value: "87", label: "satisfação", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

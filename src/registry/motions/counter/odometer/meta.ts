import type { MotionMeta } from "@/registry/types";
import Odometer from "./odometer";

export const meta: MotionMeta = {
  id: "odometer",
  name: "Odometer",
  category: "counter",
  base: 4,
  format: "square",
  Comp: Odometer,
  fields: [
    { key: "value", labelKey: "number", type: "text" },
    { key: "prefix", labelKey: "prefix", type: "text" },
    { key: "label", labelKey: "caption", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "caption", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { value: "1000000", prefix: "", label: "downloads", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

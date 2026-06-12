import type { MotionMeta } from "@/registry/types";
import GridPulse from "./grid-pulse";

export const meta: MotionMeta = {
  id: "grid-pulse",
  name: "Grid Pulse",
  category: "background",
  base: 3,
  format: "square",
  Comp: GridPulse,
  fields: [
    { key: "text", labelKey: "text", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "dots", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "sistema", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

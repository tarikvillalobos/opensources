import type { MotionMeta } from "@/catalog/types";
import { text, color, bg } from "@/catalog/lib/fields";
import GridPulse from "./grid-pulse";

export const meta: MotionMeta = {
  id: "grid-pulse", name: "Grid Pulse", category: "background",
  base: 3, format: "square", Comp: GridPulse,
  fields: [text("text", "text"), color("color", "text"), color("accent", "dots"), bg()],
  defaults: { text: "sistema", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

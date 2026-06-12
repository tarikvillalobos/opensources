import type { MotionMeta } from "@/catalog/types";
import { text, color, bg } from "@/catalog/lib/fields";
import BigPercent from "./big-percent";

export const meta: MotionMeta = {
  id: "big-percent", name: "Big Percent", category: "counter",
  base: 4, format: "square", Comp: BigPercent,
  fields: [text("value", "percent"), text("label", "caption"), color("color", "text"), color("accent", "ring"), bg()],
  defaults: { value: "87", label: "satisfação", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

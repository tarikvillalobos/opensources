import type { MotionMeta } from "@/catalog/types";
import { text, color, bg } from "@/catalog/lib/fields";
import Odometer from "./odometer";

export const meta: MotionMeta = {
  id: "odometer", name: "Odometer", category: "counter",
  base: 4, format: "square", Comp: Odometer,
  fields: [text("value", "number"), text("prefix", "prefix"), text("label", "caption"), color("color", "text"), color("accent", "caption"), bg()],
  defaults: { value: "1000000", prefix: "", label: "downloads", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

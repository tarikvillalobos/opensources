import type { MotionMeta } from "@/catalog/types";
import { area, color, bg } from "@/catalog/lib/fields";
import PillPop from "./pill-pop";

export const meta: MotionMeta = {
  id: "pill-pop", name: "Pill Pop", category: "badge",
  base: 3.4, format: "square", Comp: PillPop,
  fields: [area("text", "tags"), color("color", "colorB"), color("accent", "colorA"), bg()],
  defaults: { text: "design, motion, código, open", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

import type { MotionMeta } from "@/registry/types";
import { text, color, bg } from "@/registry/lib/fields";
import SwipeCTA from "./swipe-cta";

export const meta: MotionMeta = {
  id: "swipe-cta", name: "Swipe CTA", category: "badge",
  base: 2.4, format: "story", Comp: SwipeCTA,
  fields: [text("text", "text"), color("color", "text"), color("accent", "highlight"), bg()],
  defaults: { text: "arrasta pra cima", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

import type { MotionMeta } from "@/registry/types";
import SwipeCTA from "./swipe-cta";

export const meta: MotionMeta = {
  id: "swipe-cta",
  name: "Swipe CTA",
  category: "badge",
  base: 2.4,
  format: "story",
  Comp: SwipeCTA,
  fields: [
    { key: "text", labelKey: "text", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "highlight", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "arrasta pra cima", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

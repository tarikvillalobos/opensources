import type { MotionMeta } from "@/registry/types";
import { text, color, bg } from "@/registry/lib/fields";
import Subscribe from "./subscribe";

export const meta: MotionMeta = {
  id: "subscribe", name: "Subscribe", category: "badge",
  base: 3, format: "wide", Comp: Subscribe,
  fields: [text("text", "button"), color("color", "bell"), color("accent", "button"), bg()],
  defaults: { text: "Inscreva-se", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

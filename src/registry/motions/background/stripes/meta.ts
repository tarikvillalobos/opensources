import type { MotionMeta } from "@/registry/types";
import { text, color, bg } from "@/registry/lib/fields";
import Stripes from "./stripes";

export const meta: MotionMeta = {
  id: "stripes", name: "Stripes", category: "background",
  base: 5, format: "square", Comp: Stripes,
  fields: [text("text", "text"), color("color", "text"), color("accent", "stripes"), bg()],
  defaults: { text: "ATENÇÃO", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

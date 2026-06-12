import type { MotionMeta } from "@/registry/types";
import { text, color, bg } from "@/registry/lib/fields";
import Scramble from "./scramble";

export const meta: MotionMeta = {
  id: "scramble", name: "Scramble", category: "kinetic",
  base: 4, format: "square", Comp: Scramble,
  fields: [text("text", "text"), color("color", "text"), color("accent", "cursor"), bg()],
  defaults: { text: "OPENSOURCES", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

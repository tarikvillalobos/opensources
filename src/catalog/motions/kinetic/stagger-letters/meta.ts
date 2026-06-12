import type { MotionMeta } from "@/catalog/types";
import { text, color, bg } from "@/catalog/lib/fields";
import StaggerLetters from "./stagger-letters";

export const meta: MotionMeta = {
  id: "stagger-letters", name: "Stagger Letters", category: "kinetic",
  base: 3.4, format: "square", Comp: StaggerLetters,
  fields: [text("text", "text"), color("color", "text"), bg()],
  defaults: { text: "BOOM", color: "#c8ff2d", bg: "#0a0a0a" },
};

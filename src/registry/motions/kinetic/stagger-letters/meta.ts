import type { MotionMeta } from "@/registry/types";
import { text, color, bg } from "@/registry/lib/fields";
import StaggerLetters from "./stagger-letters";

export const meta: MotionMeta = {
  id: "stagger-letters", name: "Stagger Letters", category: "kinetic",
  base: 3.4, format: "square", Comp: StaggerLetters,
  fields: [text("text", "text"), color("color", "text"), bg()],
  defaults: { text: "BOOM", color: "#c8ff2d", bg: "#0a0a0a" },
};

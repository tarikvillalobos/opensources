import type { MotionMeta } from "@/registry/types";
import { area, color, bg } from "@/registry/lib/fields";
import SlideWords from "./slide-words";

export const meta: MotionMeta = {
  id: "slide-words", name: "Slide Words", category: "kinetic",
  base: 3.6, format: "square", Comp: SlideWords,
  fields: [area("text", "text"), color("color", "text"), bg()],
  defaults: { text: "entra de todos os lados", color: "#ffffff", bg: "#111317" },
};

import type { MotionMeta } from "@/catalog/types";
import { area, color, bg } from "@/catalog/lib/fields";
import SlideWords from "./slide-words";

export const meta: MotionMeta = {
  id: "slide-words", name: "Slide Words", category: "kinetic",
  base: 3.6, format: "square", Comp: SlideWords,
  fields: [area("text", "text"), color("color", "text"), bg()],
  defaults: { text: "entra de todos os lados", color: "#ffffff", bg: "#111317" },
};

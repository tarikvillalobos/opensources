import type { MotionMeta } from "@/registry/types";
import SlideWords from "./slide-words";

export const meta: MotionMeta = {
  id: "slide-words",
  name: "Slide Words",
  category: "kinetic",
  base: 3.6,
  format: "square",
  Comp: SlideWords,
  fields: [
    { key: "text", labelKey: "text", type: "area" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "entra de todos os lados", color: "#ffffff", bg: "#111317" },
};

import type { MotionMeta } from "@/registry/types";
import FlipWords from "./flip-words";

export const meta: MotionMeta = {
  id: "flip-words",
  name: "Flip Words",
  category: "kinetic",
  base: 4.4,
  format: "square",
  Comp: FlipWords,
  fields: [
    { key: "pre", labelKey: "before", type: "text" },
    { key: "words", labelKey: "words", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "highlight", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { pre: "somos", words: "rápidos,ousados,abertos", color: "#ffffff", accent: "#c8ff2d", bg: "#111317" },
};

import type { MotionMeta } from "@/registry/types";
import HighlightSweep from "./highlight-sweep";

export const meta: MotionMeta = {
  id: "highlight-sweep",
  name: "Highlight Sweep",
  category: "kinetic",
  base: 3.8,
  format: "square",
  Comp: HighlightSweep,
  fields: [
    { key: "pre", labelKey: "before", type: "text" },
    { key: "word", labelKey: "word", type: "text" },
    { key: "post", labelKey: "after", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "marker", type: "color" },
    { key: "ink", labelKey: "markedText", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { pre: "isso é", word: "importante", post: "", color: "#ffffff", accent: "#c8ff2d", ink: "#0a0a0a", bg: "#0a0a0a" },
};

import type { MotionMeta } from "@/catalog/types";
import { text, color, bg } from "@/catalog/lib/fields";
import HighlightSweep from "./highlight-sweep";

export const meta: MotionMeta = {
  id: "highlight-sweep", name: "Highlight Sweep", category: "kinetic",
  base: 3.8, format: "square", Comp: HighlightSweep,
  fields: [text("pre", "before"), text("word", "word"), text("post", "after"), color("color", "text"), color("accent", "marker"), color("ink", "markedText"), bg()],
  defaults: { pre: "isso é", word: "importante", post: "", color: "#ffffff", accent: "#c8ff2d", ink: "#0a0a0a", bg: "#0a0a0a" },
};

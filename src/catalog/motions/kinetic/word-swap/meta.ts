import type { MotionMeta } from "@/catalog/types";
import { text, color, bg } from "@/catalog/lib/fields";
import WordSwap from "./word-swap";

export const meta: MotionMeta = {
  id: "word-swap", name: "Word Swap", category: "kinetic",
  base: 4.4, format: "square", Comp: WordSwap,
  fields: [text("pre", "before"), text("words", "words"), text("post", "after"), color("color", "text"), color("accent", "highlight"), bg()],
  defaults: { pre: "feito para", words: "criadores,marcas,você,todos", post: "", color: "#ffffff", accent: "#c8ff2d", bg: "#111317" },
};

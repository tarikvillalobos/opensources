import type { MotionMeta } from "@/registry/types";
import WordSwap from "./word-swap";

export const meta: MotionMeta = {
  id: "word-swap",
  name: "Word Swap",
  category: "kinetic",
  base: 4.4,
  format: "square",
  Comp: WordSwap,
  fields: [
    { key: "pre", labelKey: "before", type: "text" },
    { key: "words", labelKey: "words", type: "text" },
    { key: "post", labelKey: "after", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "highlight", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { pre: "feito para", words: "criadores,marcas,você,todos", post: "", color: "#ffffff", accent: "#c8ff2d", bg: "#111317" },
};

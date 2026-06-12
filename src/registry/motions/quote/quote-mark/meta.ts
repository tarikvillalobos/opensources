import type { MotionMeta } from "@/registry/types";
import QuoteMark from "./quote-mark";

export const meta: MotionMeta = {
  id: "quote-mark",
  name: "Quote Mark",
  category: "quote",
  base: 5,
  format: "square",
  rich: true,
  Comp: QuoteMark,
  fields: [
    { key: "text", labelKey: "quoteText", type: "area" },
    { key: "by", labelKey: "author", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "highlight", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "o design não é como *parece*, é como *funciona*", by: "Steve Jobs", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

import type { MotionMeta } from "@/catalog/types";
import { area, text, color, bg } from "@/catalog/lib/fields";
import QuoteMark from "./quote-mark";

export const meta: MotionMeta = {
  id: "quote-mark", name: "Quote Mark", category: "quote",
  base: 5, format: "square", rich: true, Comp: QuoteMark,
  fields: [area("text", "quoteText"), text("by", "author"), color("color", "text"), color("accent", "highlight"), bg()],
  defaults: { text: "o design não é como *parece*, é como *funciona*", by: "Steve Jobs", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

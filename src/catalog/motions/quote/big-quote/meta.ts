import type { MotionMeta } from "@/catalog/types";
import { area, text, color, bg } from "@/catalog/lib/fields";
import BigQuote from "./big-quote";

export const meta: MotionMeta = {
  id: "big-quote", name: "Big Quote", category: "quote",
  base: 5, format: "square", rich: true, Comp: BigQuote,
  fields: [area("text", "quoteLines"), text("by", "author"), color("color", "text"), color("accent", "highlight"), bg()],
  defaults: { text: "faça\ncoisas que\n*importam*", by: "OpenSources", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

import type { MotionMeta } from "@/registry/types";
import BigQuote from "./big-quote";

export const meta: MotionMeta = {
  id: "big-quote",
  name: "Big Quote",
  category: "quote",
  base: 5,
  format: "square",
  rich: true,
  Comp: BigQuote,
  fields: [
    { key: "text", labelKey: "quoteLines", type: "area" },
    { key: "by", labelKey: "author", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "highlight", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "faça\ncoisas que\n*importam*", by: "OpenSources", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

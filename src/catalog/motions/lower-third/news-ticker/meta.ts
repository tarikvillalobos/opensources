import type { MotionMeta } from "@/catalog/types";
import { text, color, bg } from "@/catalog/lib/fields";
import NewsTicker from "./news-ticker";

export const meta: MotionMeta = {
  id: "news-ticker", name: "News Ticker", category: "lower-third",
  base: 4, format: "wide", Comp: NewsTicker,
  fields: [text("label", "tagLabel"), text("text", "headline"), color("accent", "tagLabel"), bg()],
  defaults: { label: "URGENTE", text: "OpenSources lança 30 novos componentes em motion", accent: "#c8ff2d", color: "#ffffff", bg: "#111317" },
};

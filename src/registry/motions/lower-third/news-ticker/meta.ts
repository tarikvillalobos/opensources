import type { MotionMeta } from "@/registry/types";
import NewsTicker from "./news-ticker";

export const meta: MotionMeta = {
  id: "news-ticker",
  name: "News Ticker",
  category: "lower-third",
  base: 4,
  format: "wide",
  Comp: NewsTicker,
  fields: [
    { key: "label", labelKey: "tagLabel", type: "text" },
    { key: "text", labelKey: "headline", type: "text" },
    { key: "accent", labelKey: "tagLabel", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { label: "URGENTE", text: "OpenSources lança 30 novos componentes em motion", accent: "#c8ff2d", color: "#ffffff", bg: "#111317" },
};

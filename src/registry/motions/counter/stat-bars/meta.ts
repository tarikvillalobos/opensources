import type { MotionMeta } from "@/registry/types";
import StatBars from "./stat-bars";

export const meta: MotionMeta = {
  id: "stat-bars",
  name: "Stat Bars",
  category: "counter",
  base: 4,
  format: "square",
  Comp: StatBars,
  fields: [
    { key: "l1", labelKey: "line1", type: "text" },
    { key: "v1", labelKey: "pct1", type: "text" },
    { key: "l2", labelKey: "line2", type: "text" },
    { key: "v2", labelKey: "pct2", type: "text" },
    { key: "l3", labelKey: "line3", type: "text" },
    { key: "v3", labelKey: "pct3", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "highlight", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { l1: "Alcance", v1: "92", l2: "Engajamento", v2: "68", l3: "Conversão", v3: "41", color: "#ffffff", accent: "#c8ff2d", bg: "#111317" },
};

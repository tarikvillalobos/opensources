import type { MotionMeta } from "@/catalog/types";
import { text, color, bg } from "@/catalog/lib/fields";
import StatBars from "./stat-bars";

export const meta: MotionMeta = {
  id: "stat-bars", name: "Stat Bars", category: "counter",
  base: 4, format: "square", Comp: StatBars,
  fields: [text("l1", "line1"), text("v1", "pct1"), text("l2", "line2"), text("v2", "pct2"), text("l3", "line3"), text("v3", "pct3"), color("color", "text"), color("accent", "highlight"), bg()],
  defaults: { l1: "Alcance", v1: "92", l2: "Engajamento", v2: "68", l3: "Conversão", v3: "41", color: "#ffffff", accent: "#c8ff2d", bg: "#111317" },
};

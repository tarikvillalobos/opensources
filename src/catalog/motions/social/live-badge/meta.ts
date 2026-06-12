import type { MotionMeta } from "@/catalog/types";
import { text, color, bg } from "@/catalog/lib/fields";
import LiveBadge from "./live-badge";

export const meta: MotionMeta = {
  id: "live-badge", name: "Live Badge", category: "social",
  base: 2.4, format: "square", Comp: LiveBadge,
  fields: [text("text", "text"), color("accent", "color"), bg()],
  defaults: { text: "AO VIVO", accent: "#ff4d4d", color: "#ffffff", bg: "#0a0a0a" },
};

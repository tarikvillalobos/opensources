import type { MotionMeta } from "@/registry/types";
import LiveBadge from "./live-badge";

export const meta: MotionMeta = {
  id: "live-badge",
  name: "Live Badge",
  category: "social",
  base: 2.4,
  format: "square",
  Comp: LiveBadge,
  fields: [
    { key: "text", labelKey: "text", type: "text" },
    { key: "accent", labelKey: "color", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "AO VIVO", accent: "#ff4d4d", color: "#ffffff", bg: "#0a0a0a" },
};

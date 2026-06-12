import type { MotionMeta } from "@/registry/types";
import PulseBadge from "./pulse-badge";

export const meta: MotionMeta = {
  id: "pulse-badge",
  name: "Pulse Badge",
  category: "badge",
  base: 2.6,
  format: "square",
  Comp: PulseBadge,
  fields: [
    { key: "text", labelKey: "text", type: "text" },
    { key: "sub", labelKey: "subtext", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "color", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "NOVO", sub: "DISPONÍVEL", color: "#0a0a0a", accent: "#c8ff2d", bg: "#111317" },
};

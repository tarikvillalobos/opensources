import type { MotionMeta } from "@/registry/types";
import { text, color, bg } from "@/registry/lib/fields";
import PulseBadge from "./pulse-badge";

export const meta: MotionMeta = {
  id: "pulse-badge", name: "Pulse Badge", category: "badge",
  base: 2.6, format: "square", Comp: PulseBadge,
  fields: [text("text", "text"), text("sub", "subtext"), color("color", "text"), color("accent", "color"), bg()],
  defaults: { text: "NOVO", sub: "DISPONÍVEL", color: "#0a0a0a", accent: "#c8ff2d", bg: "#111317" },
};

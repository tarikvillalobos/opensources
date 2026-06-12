import type { MotionMeta } from "@/catalog/types";
import { text, color, bg } from "@/catalog/lib/fields";
import SaleBurst from "./sale-burst";

export const meta: MotionMeta = {
  id: "sale-burst", name: "Sale Burst", category: "badge",
  base: 3, format: "square", Comp: SaleBurst,
  fields: [text("text", "text"), text("sub", "subtext"), color("color", "text"), color("accent", "star"), bg()],
  defaults: { text: "-50%", sub: "só hoje", color: "#0a0a0a", accent: "#c8ff2d", bg: "#111317" },
};

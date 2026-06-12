import type { MotionMeta } from "@/registry/types";
import SaleBurst from "./sale-burst";

export const meta: MotionMeta = {
  id: "sale-burst",
  name: "Sale Burst",
  category: "badge",
  base: 3,
  format: "square",
  Comp: SaleBurst,
  fields: [
    { key: "text", labelKey: "text", type: "text" },
    { key: "sub", labelKey: "subtext", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "star", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "-50%", sub: "só hoje", color: "#0a0a0a", accent: "#c8ff2d", bg: "#111317" },
};

import type { MotionMeta } from "@/registry/types";
import Subscribe from "./subscribe";

export const meta: MotionMeta = {
  id: "subscribe",
  name: "Subscribe",
  category: "badge",
  base: 3,
  format: "wide",
  Comp: Subscribe,
  fields: [
    { key: "text", labelKey: "button", type: "text" },
    { key: "color", labelKey: "bell", type: "color" },
    { key: "accent", labelKey: "button", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "Inscreva-se", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

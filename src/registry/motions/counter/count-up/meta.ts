import type { MotionMeta } from "@/registry/types";
import CountUp from "./count-up";

export const meta: MotionMeta = {
  id: "count-up",
  name: "Count Up",
  category: "counter",
  base: 4,
  format: "square",
  Comp: CountUp,
  fields: [
    { key: "value", labelKey: "number", type: "text" },
    { key: "prefix", labelKey: "prefix", type: "text" },
    { key: "suffix", labelKey: "suffix", type: "text" },
    { key: "label", labelKey: "caption", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "highlight", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { value: "12500", prefix: "", suffix: "+", label: "seguidores este mês", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

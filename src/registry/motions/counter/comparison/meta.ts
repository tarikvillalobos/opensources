import type { MotionMeta } from "@/registry/types";
import Comparison from "./comparison";

export const meta: MotionMeta = {
  id: "comparison",
  name: "Comparison",
  category: "counter",
  base: 4,
  format: "square",
  Comp: Comparison,
  fields: [
    { key: "l1", labelKey: "label1", type: "text" },
    { key: "v1", labelKey: "value1", type: "text" },
    { key: "l2", labelKey: "label2", type: "text" },
    { key: "v2", labelKey: "value2", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "highlight", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { l1: "antes", v1: "120", l2: "depois", v2: "940", color: "#ffffff", accent: "#c8ff2d", bg: "#111317" },
};

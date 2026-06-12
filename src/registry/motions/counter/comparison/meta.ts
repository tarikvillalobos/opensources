import type { MotionMeta } from "@/registry/types";
import { text, color, bg } from "@/registry/lib/fields";
import Comparison from "./comparison";

export const meta: MotionMeta = {
  id: "comparison", name: "Comparison", category: "counter",
  base: 4, format: "square", Comp: Comparison,
  fields: [text("l1", "label1"), text("v1", "value1"), text("l2", "label2"), text("v2", "value2"), color("color", "text"), color("accent", "highlight"), bg()],
  defaults: { l1: "antes", v1: "120", l2: "depois", v2: "940", color: "#ffffff", accent: "#c8ff2d", bg: "#111317" },
};

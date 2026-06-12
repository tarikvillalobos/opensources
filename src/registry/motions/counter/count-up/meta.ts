import type { MotionMeta } from "@/registry/types";
import { text, color, bg } from "@/registry/lib/fields";
import CountUp from "./count-up";

export const meta: MotionMeta = {
  id: "count-up", name: "Count Up", category: "counter",
  base: 4, format: "square", Comp: CountUp,
  fields: [text("value", "number"), text("prefix", "prefix"), text("suffix", "suffix"), text("label", "caption"), color("color", "text"), color("accent", "highlight"), bg()],
  defaults: { value: "12500", prefix: "", suffix: "+", label: "seguidores este mês", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

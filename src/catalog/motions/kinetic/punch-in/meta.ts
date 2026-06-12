import type { MotionMeta } from "@/catalog/types";
import { area, color, bg } from "@/catalog/lib/fields";
import PunchIn from "./punch-in";

export const meta: MotionMeta = {
  id: "punch-in", name: "Punch In", category: "kinetic",
  base: 3.2, format: "square", rich: true, Comp: PunchIn,
  fields: [area("text", "text"), color("color", "textColor"), color("accent", "highlight"), bg()],
  defaults: { text: "foco\n*total*", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

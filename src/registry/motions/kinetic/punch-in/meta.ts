import type { MotionMeta } from "@/registry/types";
import PunchIn from "./punch-in";

export const meta: MotionMeta = {
  id: "punch-in",
  name: "Punch In",
  category: "kinetic",
  base: 3.2,
  format: "square",
  rich: true,
  Comp: PunchIn,
  fields: [
    { key: "text", labelKey: "text", type: "area" },
    { key: "color", labelKey: "textColor", type: "color" },
    { key: "accent", labelKey: "highlight", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "foco\n*total*", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

import type { MotionMeta } from "@/registry/types";
import StaggerLetters from "./stagger-letters";

export const meta: MotionMeta = {
  id: "stagger-letters",
  name: "Stagger Letters",
  category: "kinetic",
  base: 3.4,
  format: "square",
  Comp: StaggerLetters,
  fields: [
    { key: "text", labelKey: "text", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "BOOM", color: "#c8ff2d", bg: "#0a0a0a" },
};

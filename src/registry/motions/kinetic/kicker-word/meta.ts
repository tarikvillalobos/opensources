import type { MotionMeta } from "@/registry/types";
import KickerWord from "./kicker-word";

export const meta: MotionMeta = {
  id: "kicker-word",
  name: "Kicker Word",
  category: "kinetic",
  base: 3.6,
  format: "square",
  Comp: KickerWord,
  fields: [
    { key: "kicker", labelKey: "kicker", type: "text" },
    { key: "text", labelKey: "word", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "kicker", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { kicker: "apresentamos", text: "OPEN", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

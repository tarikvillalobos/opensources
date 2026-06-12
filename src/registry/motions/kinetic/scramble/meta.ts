import type { MotionMeta } from "@/registry/types";
import Scramble from "./scramble";

export const meta: MotionMeta = {
  id: "scramble",
  name: "Scramble",
  category: "kinetic",
  base: 4,
  format: "square",
  Comp: Scramble,
  fields: [
    { key: "text", labelKey: "text", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "cursor", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "OPENSOURCES", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

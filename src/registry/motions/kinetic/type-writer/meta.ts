import type { MotionMeta } from "@/registry/types";
import TypeWriter from "./type-writer";

export const meta: MotionMeta = {
  id: "type-writer",
  name: "Type Writer",
  category: "kinetic",
  base: 4,
  format: "square",
  Comp: TypeWriter,
  fields: [
    { key: "text", labelKey: "text", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "cursor", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "digitando ao vivo…", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

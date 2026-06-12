import type { MotionMeta } from "@/registry/types";
import Marquee from "./marquee";

export const meta: MotionMeta = {
  id: "marquee",
  name: "Marquee",
  category: "background",
  base: 4,
  format: "square",
  Comp: Marquee,
  fields: [
    { key: "text", labelKey: "band1", type: "text" },
    { key: "text2", labelKey: "band2", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "band", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "OPEN SOURCES", text2: "COPIE · EDITE · POSTE", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

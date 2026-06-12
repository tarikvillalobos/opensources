import type { MotionMeta } from "@/registry/types";
import CaptionBar from "./caption-bar";

export const meta: MotionMeta = {
  id: "caption-bar",
  name: "Caption Bar",
  category: "lower-third",
  base: 4.2,
  format: "wide",
  Comp: CaptionBar,
  fields: [
    { key: "name", labelKey: "name", type: "text" },
    { key: "role", labelKey: "role", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "highlight", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { name: "Marina Costa", role: "Diretora de criação", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

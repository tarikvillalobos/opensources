import type { MotionMeta } from "@/registry/types";
import Spotlight from "./spotlight";

export const meta: MotionMeta = {
  id: "spotlight",
  name: "Spotlight",
  category: "background",
  base: 4,
  format: "square",
  Comp: Spotlight,
  fields: [
    { key: "text", labelKey: "text", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "light", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "em foco", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

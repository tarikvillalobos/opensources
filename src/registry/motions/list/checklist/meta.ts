import type { MotionMeta } from "@/registry/types";
import Checklist from "./checklist";

export const meta: MotionMeta = {
  id: "checklist",
  name: "Checklist",
  category: "list",
  base: 4.2,
  format: "square",
  Comp: Checklist,
  fields: [
    { key: "text", labelKey: "items", type: "area" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "box", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "copiar\neditar\nbaixar\npostar", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

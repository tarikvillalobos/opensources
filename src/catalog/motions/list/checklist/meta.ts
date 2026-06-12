import type { MotionMeta } from "@/catalog/types";
import { area, color, bg } from "@/catalog/lib/fields";
import Checklist from "./checklist";

export const meta: MotionMeta = {
  id: "checklist", name: "Checklist", category: "list",
  base: 4.2, format: "square", Comp: Checklist,
  fields: [area("text", "items"), color("color", "text"), color("accent", "box"), bg()],
  defaults: { text: "copiar\neditar\nbaixar\npostar", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

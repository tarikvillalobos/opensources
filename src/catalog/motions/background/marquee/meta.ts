import type { MotionMeta } from "@/catalog/types";
import { text, color, bg } from "@/catalog/lib/fields";
import Marquee from "./marquee";

export const meta: MotionMeta = {
  id: "marquee", name: "Marquee", category: "background",
  base: 4, format: "square", Comp: Marquee,
  fields: [text("text", "band1"), text("text2", "band2"), color("color", "text"), color("accent", "band"), bg()],
  defaults: { text: "OPEN SOURCES", text2: "COPIE · EDITE · POSTE", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

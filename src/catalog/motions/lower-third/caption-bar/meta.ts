import type { MotionMeta } from "@/catalog/types";
import { text, color, bg } from "@/catalog/lib/fields";
import CaptionBar from "./caption-bar";

export const meta: MotionMeta = {
  id: "caption-bar", name: "Caption Bar", category: "lower-third",
  base: 4.2, format: "wide", Comp: CaptionBar,
  fields: [text("name", "name"), text("role", "role"), color("color", "text"), color("accent", "highlight"), bg()],
  defaults: { name: "Marina Costa", role: "Diretora de criação", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

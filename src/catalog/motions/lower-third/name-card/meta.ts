import type { MotionMeta } from "@/catalog/types";
import { text, color, bg } from "@/catalog/lib/fields";
import NameCard from "./name-card";

export const meta: MotionMeta = {
  id: "name-card", name: "Name Card", category: "lower-third",
  base: 4, format: "wide", Comp: NameCard,
  fields: [text("name", "name"), text("handle", "handle"), color("color", "text"), color("accent", "highlight"), bg()],
  defaults: { name: "Marina Costa", handle: "@marina", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

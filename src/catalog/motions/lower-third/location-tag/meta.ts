import type { MotionMeta } from "@/catalog/types";
import { text, color, bg } from "@/catalog/lib/fields";
import LocationTag from "./location-tag";

export const meta: MotionMeta = {
  id: "location-tag", name: "Location Tag", category: "lower-third",
  base: 3.6, format: "portrait", Comp: LocationTag,
  fields: [text("text", "location"), color("color", "text"), color("accent", "bg"), bg()],
  defaults: { text: "São Paulo, BR", color: "#0a0a0a", accent: "#c8ff2d", bg: "#111317" },
};

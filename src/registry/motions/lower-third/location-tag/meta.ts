import type { MotionMeta } from "@/registry/types";
import LocationTag from "./location-tag";

export const meta: MotionMeta = {
  id: "location-tag",
  name: "Location Tag",
  category: "lower-third",
  base: 3.6,
  format: "portrait",
  Comp: LocationTag,
  fields: [
    { key: "text", labelKey: "location", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "bg", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "São Paulo, BR", color: "#0a0a0a", accent: "#c8ff2d", bg: "#111317" },
};

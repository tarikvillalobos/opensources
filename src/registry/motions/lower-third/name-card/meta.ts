import type { MotionMeta } from "@/registry/types";
import NameCard from "./name-card";

export const meta: MotionMeta = {
  id: "name-card",
  name: "Name Card",
  category: "lower-third",
  base: 4,
  format: "wide",
  Comp: NameCard,
  fields: [
    { key: "name", labelKey: "name", type: "text" },
    { key: "handle", labelKey: "handle", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "highlight", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { name: "Marina Costa", handle: "@marina", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

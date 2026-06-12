import type { MotionMeta } from "@/registry/types";
import TagPop from "./tag-pop";

export const meta: MotionMeta = {
  id: "tag-pop",
  name: "Tag Pop",
  category: "lower-third",
  base: 3.6,
  format: "portrait",
  Comp: TagPop,
  fields: [
    { key: "text", labelKey: "text", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "badgeBg", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "novo episódio", color: "#0a0a0a", accent: "#c8ff2d", bg: "#111317" },
};

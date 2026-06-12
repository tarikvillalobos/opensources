import type { MotionMeta } from "@/registry/types";
import { text, color, bg } from "@/registry/lib/fields";
import TagPop from "./tag-pop";

export const meta: MotionMeta = {
  id: "tag-pop", name: "Tag Pop", category: "lower-third",
  base: 3.6, format: "portrait", Comp: TagPop,
  fields: [text("text", "text"), color("color", "text"), color("accent", "badgeBg"), bg()],
  defaults: { text: "novo episódio", color: "#0a0a0a", accent: "#c8ff2d", bg: "#111317" },
};

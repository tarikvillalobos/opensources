import type { MotionMeta } from "@/registry/types";
import { text, color, bg } from "@/registry/lib/fields";
import TypeWriter from "./type-writer";

export const meta: MotionMeta = {
  id: "type-writer", name: "Type Writer", category: "kinetic",
  base: 4, format: "square", Comp: TypeWriter,
  fields: [text("text", "text"), color("color", "text"), color("accent", "cursor"), bg()],
  defaults: { text: "digitando ao vivo…", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

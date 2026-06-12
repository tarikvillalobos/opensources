import type { MotionMeta } from "@/catalog/types";
import { text, color, bg } from "@/catalog/lib/fields";
import KickerWord from "./kicker-word";

export const meta: MotionMeta = {
  id: "kicker-word", name: "Kicker Word", category: "kinetic",
  base: 3.6, format: "square", Comp: KickerWord,
  fields: [text("kicker", "kicker"), text("text", "word"), color("color", "text"), color("accent", "kicker"), bg()],
  defaults: { kicker: "apresentamos", text: "OPEN", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

import type { MotionMeta } from "@/registry/types";
import { text, color, bg } from "@/registry/lib/fields";
import Spotlight from "./spotlight";

export const meta: MotionMeta = {
  id: "spotlight", name: "Spotlight", category: "background",
  base: 4, format: "square", Comp: Spotlight,
  fields: [text("text", "text"), color("color", "text"), color("accent", "light"), bg()],
  defaults: { text: "em foco", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

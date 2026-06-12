import type { MotionMeta } from "@/catalog/types";
import { text, color, bg } from "@/catalog/lib/fields";
import LikeBurst from "./like-burst";

export const meta: MotionMeta = {
  id: "like-burst", name: "Like Burst", category: "social",
  base: 3.4, format: "square", Comp: LikeBurst,
  fields: [text("value", "likes"), color("color", "text"), color("accent", "heart"), bg()],
  defaults: { value: "2400", color: "#ffffff", accent: "#ff4d8d", bg: "#0a0a0a" },
};

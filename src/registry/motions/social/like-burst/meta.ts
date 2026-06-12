import type { MotionMeta } from "@/registry/types";
import LikeBurst from "./like-burst";

export const meta: MotionMeta = {
  id: "like-burst",
  name: "Like Burst",
  category: "social",
  base: 3.4,
  format: "square",
  Comp: LikeBurst,
  fields: [
    { key: "value", labelKey: "likes", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "heart", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { value: "2400", color: "#ffffff", accent: "#ff4d8d", bg: "#0a0a0a" },
};

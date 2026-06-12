import type { MotionMeta } from "@/catalog/types";
import { text, color, bg } from "@/catalog/lib/fields";
import FollowBtn from "./follow-btn";

export const meta: MotionMeta = {
  id: "follow-btn", name: "Follow Button", category: "social",
  base: 3.6, format: "wide", Comp: FollowBtn,
  fields: [text("text", "state1"), text("text2", "state2"), color("color", "text"), color("accent", "button"), bg()],
  defaults: { text: "Seguir", text2: "Seguindo", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

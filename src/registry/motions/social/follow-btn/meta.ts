import type { MotionMeta } from "@/registry/types";
import FollowBtn from "./follow-btn";

export const meta: MotionMeta = {
  id: "follow-btn",
  name: "Follow Button",
  category: "social",
  base: 3.6,
  format: "wide",
  Comp: FollowBtn,
  fields: [
    { key: "text", labelKey: "state1", type: "text" },
    { key: "text2", labelKey: "state2", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "button", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "Seguir", text2: "Seguindo", color: "#ffffff", accent: "#c8ff2d", bg: "#0a0a0a" },
};

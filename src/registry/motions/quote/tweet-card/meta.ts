import type { MotionMeta } from "@/registry/types";
import TweetCard from "./tweet-card";

export const meta: MotionMeta = {
  id: "tweet-card",
  name: "Tweet Card",
  category: "quote",
  base: 4.2,
  format: "square",
  rich: true,
  Comp: TweetCard,
  fields: [
    { key: "name", labelKey: "name", type: "text" },
    { key: "handle", labelKey: "handle", type: "text" },
    { key: "text", labelKey: "post", type: "area" },
    { key: "accent", labelKey: "avatar", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { name: "Lia", handle: "@liadev", text: "descobri o *OpenSources* e não paro de criar", accent: "#1d9bf0", color: "#ffffff", bg: "#0a0a0a" },
};

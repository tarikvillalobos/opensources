import type { MotionMeta } from "@/catalog/types";
import { area, text, color, bg } from "@/catalog/lib/fields";
import TweetCard from "./tweet-card";

export const meta: MotionMeta = {
  id: "tweet-card", name: "Tweet Card", category: "quote",
  base: 4.2, format: "square", rich: true, Comp: TweetCard,
  fields: [text("name", "name"), text("handle", "handle"), area("text", "post"), color("accent", "avatar"), bg()],
  defaults: { name: "Lia", handle: "@liadev", text: "descobri o *OpenSources* e não paro de criar", accent: "#1d9bf0", color: "#ffffff", bg: "#0a0a0a" },
};

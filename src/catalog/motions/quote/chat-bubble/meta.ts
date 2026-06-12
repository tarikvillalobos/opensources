import type { MotionMeta } from "@/catalog/types";
import { area, color, bg } from "@/catalog/lib/fields";
import ChatBubble from "./chat-bubble";

export const meta: MotionMeta = {
  id: "chat-bubble", name: "Chat Bubble", category: "quote",
  base: 4.6, format: "portrait", Comp: ChatBubble,
  fields: [area("text", "messages"), color("accent", "yourBubble"), bg()],
  defaults: { text: "já viu o OpenSources?\nvi! que demais\ndá pra editar tudo", accent: "#c8ff2d", color: "#ffffff", bg: "#0a0a0a" },
};

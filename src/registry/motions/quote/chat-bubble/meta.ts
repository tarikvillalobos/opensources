import type { MotionMeta } from "@/registry/types";
import { area, color, bg } from "@/registry/lib/fields";
import ChatBubble from "./chat-bubble";

export const meta: MotionMeta = {
  id: "chat-bubble", name: "Chat Bubble", category: "quote",
  base: 4.6, format: "portrait", Comp: ChatBubble,
  fields: [area("text", "messages"), color("accent", "yourBubble"), bg()],
  defaults: { text: "já viu o OpenSources?\nvi! que demais\ndá pra editar tudo", accent: "#c8ff2d", color: "#ffffff", bg: "#0a0a0a" },
};

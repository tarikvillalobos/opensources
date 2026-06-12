import type { MotionMeta } from "@/catalog/types";
import { text, color, bg } from "@/catalog/lib/fields";
import NotifyToast from "./notify-toast";

export const meta: MotionMeta = {
  id: "notify-toast", name: "Notification", category: "social",
  base: 4, format: "wide", Comp: NotifyToast,
  fields: [text("title", "title"), text("text", "message"), color("accent", "icon"), bg()],
  defaults: { title: "OpenSources", text: "seu vídeo está pronto para baixar", accent: "#c8ff2d", color: "#ffffff", bg: "#111317" },
};

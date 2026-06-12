import type { MotionMeta } from "@/registry/types";
import NotifyToast from "./notify-toast";

export const meta: MotionMeta = {
  id: "notify-toast",
  name: "Notification",
  category: "social",
  base: 4,
  format: "wide",
  Comp: NotifyToast,
  fields: [
    { key: "title", labelKey: "title", type: "text" },
    { key: "text", labelKey: "message", type: "text" },
    { key: "accent", labelKey: "icon", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { title: "OpenSources", text: "seu vídeo está pronto para baixar", accent: "#c8ff2d", color: "#ffffff", bg: "#111317" },
};

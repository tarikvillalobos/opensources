import type { MotionMeta } from "@/registry/types";
import Steps from "./steps";

export const meta: MotionMeta = {
  id: "steps",
  name: "Steps",
  category: "list",
  base: 4.4,
  format: "portrait",
  Comp: Steps,
  fields: [
    { key: "text", labelKey: "steps", type: "area" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "number", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "escolha o componente\nedite o texto\nexporte o vídeo", color: "#ffffff", accent: "#c8ff2d", bg: "#111317" },
};

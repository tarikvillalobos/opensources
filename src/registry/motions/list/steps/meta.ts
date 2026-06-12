import type { MotionMeta } from "@/registry/types";
import { area, color, bg } from "@/registry/lib/fields";
import Steps from "./steps";

export const meta: MotionMeta = {
  id: "steps", name: "Steps", category: "list",
  base: 4.4, format: "portrait", Comp: Steps,
  fields: [area("text", "steps"), color("color", "text"), color("accent", "number"), bg()],
  defaults: { text: "escolha o componente\nedite o texto\nexporte o vídeo", color: "#ffffff", accent: "#c8ff2d", bg: "#111317" },
};

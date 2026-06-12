import type { MotionMeta } from "@/registry/types";
import MeshFlow from "./mesh-flow";

export const meta: MotionMeta = {
  id: "mesh-flow",
  name: "Mesh Flow",
  category: "background",
  base: 4,
  format: "story",
  Comp: MeshFlow,
  fields: [
    { key: "text", labelKey: "text", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "color1", type: "color" },
    { key: "c2", labelKey: "color2", type: "color" },
    { key: "c3", labelKey: "color3", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "fluxo", color: "#ffffff", accent: "#c8ff2d", c2: "#5b8cff", c3: "#ff4d8d", bg: "#0a0a0a" },
};

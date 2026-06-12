import type { MotionMeta } from "@/registry/types";
import { text, color, bg } from "@/registry/lib/fields";
import MeshFlow from "./mesh-flow";

export const meta: MotionMeta = {
  id: "mesh-flow", name: "Mesh Flow", category: "background",
  base: 4, format: "story", Comp: MeshFlow,
  fields: [text("text", "text"), color("color", "text"), color("accent", "color1"), color("c2", "color2"), color("c3", "color3"), bg()],
  defaults: { text: "fluxo", color: "#ffffff", accent: "#c8ff2d", c2: "#5b8cff", c3: "#ff4d8d", bg: "#0a0a0a" },
};

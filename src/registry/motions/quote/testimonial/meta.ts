import type { MotionMeta } from "@/registry/types";
import Testimonial from "./testimonial";

export const meta: MotionMeta = {
  id: "testimonial",
  name: "Testimonial",
  category: "quote",
  base: 5,
  format: "portrait",
  rich: true,
  Comp: Testimonial,
  fields: [
    { key: "text", labelKey: "testimonialText", type: "area" },
    { key: "by", labelKey: "name", type: "text" },
    { key: "role", labelKey: "jobRole", type: "text" },
    { key: "color", labelKey: "text", type: "color" },
    { key: "accent", labelKey: "highlight", type: "color" },
    { key: "bg", labelKey: "bg", type: "bg" },
  ],
  defaults: { text: "mudou completamente a forma como a gente posta", by: "João P.", role: "@joaop", color: "#ffffff", accent: "#c8ff2d", bg: "#111317" },
};

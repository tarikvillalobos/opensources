import type { MotionMeta } from "@/registry/types";
import { area, text, color, bg } from "@/registry/lib/fields";
import Testimonial from "./testimonial";

export const meta: MotionMeta = {
  id: "testimonial", name: "Testimonial", category: "quote",
  base: 5, format: "portrait", rich: true, Comp: Testimonial,
  fields: [area("text", "testimonialText"), text("by", "name"), text("role", "jobRole"), color("color", "text"), color("accent", "highlight"), bg()],
  defaults: { text: "mudou completamente a forma como a gente posta", by: "João P.", role: "@joaop", color: "#ffffff", accent: "#c8ff2d", bg: "#111317" },
};

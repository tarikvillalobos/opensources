"use client";
import type { CSSProperties } from "react";
import type { MotionMeta, MotionProps, Format } from "@/catalog/types";
import { FONTS } from "@/catalog/lib/fonts";

/** Live preview surface — renders any motion at any size via container queries. */
export function Stage({
  motion,
  props,
  speed = 1,
  format,
}: {
  motion: MotionMeta;
  props: MotionProps;
  speed?: number;
  format?: Format;
}) {
  const fmt = format || motion.format;
  const dur = motion.base / (speed || 1);
  const C = motion.Comp;
  const scale = props._scale ?? 1;
  const style = {
    "--stage-bg": props.bg,
    fontFamily: FONTS[props._font || "geist"] || FONTS.geist,
    textTransform: props._upper ? "uppercase" : "none",
  } as CSSProperties;
  return (
    <div className={`stage stage-fmt-${fmt}`} style={style}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${scale})`, transformOrigin: "center" }}>
        <C p={props} dur={dur} />
      </div>
    </div>
  );
}

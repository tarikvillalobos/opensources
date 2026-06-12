import type { ComponentType } from "react";

export type CategoryId =
  | "kinetic"
  | "lower-third"
  | "quote"
  | "counter"
  | "background"
  | "badge"
  | "social"
  | "list";

export type Format = "square" | "portrait" | "story" | "wide";

export type FieldType = "text" | "area" | "color" | "bg";

/** A single editable control in the editor panel. */
export interface FieldSpec {
  key: string;
  /** i18n key resolved under the `fields` namespace (e.g. "text" -> t("fields.text")). */
  labelKey: string;
  type: FieldType;
}

/** Arbitrary, motion-specific props (text/color/etc.) plus editor meta-props. */
export interface MotionProps {
  // Motions read freely-typed content props (text, color, value…) by key.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  _font?: string;
  _upper?: boolean;
  _scale?: number;
}

/** Props every motion component receives from <Stage>. */
export interface MotionRenderProps {
  p: MotionProps;
  dur: number;
}

/** Full metadata for one motion engine — what the catalog and editor consume. */
export interface MotionMeta {
  id: string;
  name: string;
  category: CategoryId;
  /** Base loop duration in seconds (divided by speed). */
  base: number;
  format: Format;
  /** Whether the main text field supports *highlight* rich syntax. */
  rich?: boolean;
  Comp: ComponentType<MotionRenderProps>;
  fields: FieldSpec[];
  defaults: MotionProps;
}

/** A catalog entry shown as a card / opened in the editor. */
export interface CatalogItem {
  id: string;
  name: string;
  cat: CategoryId;
  base: string;
  motion: MotionMeta;
  format: Format;
  speed: number;
  props: MotionProps;
}

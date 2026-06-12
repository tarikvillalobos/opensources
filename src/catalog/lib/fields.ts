import type { FieldSpec } from "../types";

// Field builders for meta.ts — keep the editable schema declarative and terse.
// `labelKey` resolves under the `fields` i18n namespace.
export const text = (key: string, labelKey: string): FieldSpec => ({ key, labelKey, type: "text" });
export const area = (key: string, labelKey: string): FieldSpec => ({ key, labelKey, type: "area" });
export const color = (key: string, labelKey: string): FieldSpec => ({ key, labelKey, type: "color" });
export const bg = (): FieldSpec => ({ key: "bg", labelKey: "bg", type: "bg" });

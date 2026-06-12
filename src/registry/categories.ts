import type { CategoryId } from "./types";

/** Ordered categories. `labelKey` resolves under the `categories` i18n namespace. */
export const CATEGORIES: { id: CategoryId | "all"; labelKey: string }[] = [
  { id: "all", labelKey: "all" },
  { id: "kinetic", labelKey: "kinetic" },
  { id: "lower-third", labelKey: "lowerThird" },
  { id: "quote", labelKey: "quote" },
  { id: "counter", labelKey: "counter" },
  { id: "background", labelKey: "background" },
  { id: "badge", labelKey: "badge" },
  { id: "social", labelKey: "social" },
  { id: "list", labelKey: "list" },
];

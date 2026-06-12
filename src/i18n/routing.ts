import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  // Default locale (pt) has clean URLs (/, /components, /create);
  // other locales are prefixed (/en, /en/components).
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

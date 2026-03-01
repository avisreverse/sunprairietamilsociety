import { defineRouting } from "next-intl/routing";

/**
 * Defines locale routing configuration for next-intl.
 * English is primary; Tamil is strategic (hero, program names, decorative).
 * @see D-007 — next-intl for i18n (Tamil + English from day 1)
 */
export const routing = defineRouting({
  locales: ["en", "ta"],
  defaultLocale: "en",
});

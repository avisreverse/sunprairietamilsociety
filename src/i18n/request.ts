import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * Returns locale-specific messages for the server request.
 * @see D-007 — next-intl server configuration
 */
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validate locale against supported list, fall back to default
  if (!locale || !routing.locales.includes(locale as "en" | "ta")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

/**
 * Next.js 16 uses "proxy" file convention (was "middleware" in <16).
 * next-intl routing proxy: handles locale detection and redirect.
 * @see D-007 — next-intl for Tamil + English from day 1
 */
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * next-intl routing middleware — handles locale detection and redirect.
 * Matches all routes except Next.js internals and static files.
 * @see D-007 — next-intl for Tamil + English from day 1
 */
export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except internals and static files
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};

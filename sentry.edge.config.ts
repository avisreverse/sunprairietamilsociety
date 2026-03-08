import * as Sentry from "@sentry/nextjs";

/**
 * Sentry edge runtime initialisation (proxy.ts / middleware).
 * @see D-010 — Sentry from day 1
 */
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  enabled: process.env.NODE_ENV === "production",
});

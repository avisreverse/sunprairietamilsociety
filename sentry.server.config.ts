import * as Sentry from "@sentry/nextjs";

/**
 * Sentry server-side initialisation.
 * Runs in Next.js API routes and Server Components.
 * @see D-010 — Sentry from day 1
 */
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Capture 10% of server transactions
  tracesSampleRate: 0.1,

  // Only send errors in production
  enabled: process.env.NODE_ENV === "production",
});

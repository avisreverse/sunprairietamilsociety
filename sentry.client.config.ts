import * as Sentry from "@sentry/nextjs";

/**
 * Sentry browser-side initialisation.
 * Runs in every user's browser — captures JS errors and performance.
 * @see D-010 — Sentry from day 1
 */
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Capture 10% of sessions for performance monitoring (keep costs low)
  tracesSampleRate: 0.1,

  // Replay 1% of sessions, 100% of sessions with an error
  replaysSessionSampleRate: 0.01,
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration(),
  ],

  // Only send errors in production
  enabled: process.env.NODE_ENV === "production",
});

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withSentryConfig } from "@sentry/nextjs";

/** @see D-001 — Next.js 15 App Router (now 16) */
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  /** @see D-002 — TypeScript strict mode enforced */
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
  /** @see D-007 — next-intl for Tamil + English from day 1 */
  // next-intl plugin handles routing automatically
};

const intlConfig = withNextIntl(nextConfig);

/** @see D-010 — Sentry from day 1 */
export default withSentryConfig(intlConfig, {
  // Sentry organisation + project (from DSN URL)
  org: "spts",
  project: "sunprairietamilsociety",

  // Suppress Sentry CLI output during builds
  silent: !process.env.CI,

  // Upload source maps to Sentry for readable stack traces
  widenClientFileUpload: true,

  // Tree-shake Sentry debug code in production bundles
  disableLogger: true,

  // Automatically instrument Next.js data fetching methods
  automaticVercelMonitors: true,
});

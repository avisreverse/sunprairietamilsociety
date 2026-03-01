import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

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

export default withNextIntl(nextConfig);

import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E test configuration — SPTS Community Hub.
 * Tests run against a locally running dev server.
 * @see REQ-202603-001 — User-perspective testing required (D-009)
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    // Base URL — dev server on port 3000
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone SE"], viewport: { width: 375, height: 667 } },
    },
  ],

  // Start dev server automatically when running tests
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

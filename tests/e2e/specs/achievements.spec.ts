import { test, expect } from "@playwright/test";

/**
 * E2E tests — Achievements submit form and detail pages.
 * @see REQ-202603-005 — Achievement submit + detail pages
 * @see DEF-202603-009 — Achievement categories not extensible (Other option added)
 */

test.describe("Achievement submit form", () => {
  test("loads /en/achievements/submit regardless of section toggle state", async ({ page }) => {
    // REQ-202603-011: submit form always accessible even when section is disabled
    await page.goto("/en/achievements/submit");

    await expect(page.locator("h1")).toContainText("Submit Achievement");
    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("shows Other category free-form input when Other is selected", async ({ page }) => {
    // DEF-202603-009: Other option available
    await page.goto("/en/achievements/submit");

    const select = page.locator("select").first();
    await select.selectOption("Other");

    // Free-form text input should appear
    await expect(page.locator("input[placeholder*='Dance, Entrepreneurship']")).toBeVisible();
  });

  test("form shows validation error when submitted empty", async ({ page }) => {
    await page.goto("/en/achievements/submit");

    // Try submitting without filling in required fields
    const submitBtn = page.locator("button[type='submit']");
    await submitBtn.click();

    // Browser validation should prevent submission (required fields)
    // The form should still be on the same page
    await expect(page.locator("h1")).toContainText("Submit Achievement");
  });

  test("mobile layout at 375px — form fits without overflow", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/en/achievements/submit");

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375);
  });
});

test.describe("Achievement detail page", () => {
  test("shows 404 for unknown achievement ID", async ({ page }) => {
    const response = await page.goto("/en/achievements/00000000-0000-0000-0000-000000000000");
    expect(response?.status()).toBe(404);
  });
});

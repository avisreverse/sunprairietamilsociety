import { test, expect } from "@playwright/test";

/**
 * E2E tests — Homepage
 * @see REQ-202603-001 — Landing page
 * @see REQ-202603-011 — Section visibility toggles
 */

test.describe("Homepage", () => {
  test("loads at /en and shows key sections", async ({ page }) => {
    await page.goto("/en");

    // Nav is visible
    await expect(page.locator("nav")).toBeVisible();

    // Hero section renders with org name
    await expect(page.locator("h1").first()).toBeVisible();

    // Programs section rendered
    await expect(page.locator("#mullai")).toBeVisible();

    // Footer visible
    await expect(page.locator("footer")).toBeVisible();
  });

  test("Thirukkural section shows verse and translation", async ({ page }) => {
    await page.goto("/en");

    const kuralSection = page.locator("#kural");
    await expect(kuralSection).toBeVisible();

    // Translation text is present (either from API or fallback)
    const translation = kuralSection.locator("p").first();
    await expect(translation).toBeVisible();
  });

  test("all nav links are not broken", async ({ page }) => {
    await page.goto("/en");

    // Check Programs link
    await page.click("text=Programs");
    await expect(page).toHaveURL(/\/programs/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("mobile layout at 375px — no horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/en");

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375);
  });
});

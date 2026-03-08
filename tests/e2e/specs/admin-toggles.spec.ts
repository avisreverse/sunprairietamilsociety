import { test, expect } from "@playwright/test";

/**
 * E2E tests — Admin section visibility toggles.
 * NOTE: These tests require admin login. They are marked as skipped until
 * the test environment is configured with valid ADMIN_EMAIL / ADMIN_PASSWORD.
 *
 * @see REQ-202603-011 — Section visibility toggles
 * @see TC-REQ-202603-011-a through TC-REQ-202603-011-e
 */

const ADMIN_EMAIL = process.env.TEST_ADMIN_EMAIL ?? "";
const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD ?? "";

test.describe("Section visibility toggles (requires admin)", () => {
  test.skip(!ADMIN_EMAIL, "Set TEST_ADMIN_EMAIL and TEST_ADMIN_PASSWORD env vars to run admin tests");

  test.beforeEach(async ({ page }) => {
    // Log in as admin
    await page.goto("/en/admin/login");
    await page.fill("input[type='email']", ADMIN_EMAIL);
    await page.fill("input[type='password']", ADMIN_PASSWORD);
    await page.click("button[type='submit']");
    await page.waitForURL("**/admin**");
  });

  test("TC-REQ-202603-011-a: disable events section → homepage hides it", async ({ page }) => {
    // Go to admin events, disable section
    await page.goto("/en/admin/events");
    const checkbox = page.locator("input[type='checkbox']").first();
    const isChecked = await checkbox.isChecked();
    if (isChecked) {
      await checkbox.click();
      await page.waitForTimeout(500);
    }

    // Check public homepage
    await page.goto("/en");
    await expect(page.locator("#marutam")).toHaveCount(0);
  });

  test("TC-REQ-202603-011-b: re-enable events section → homepage shows it", async ({ page }) => {
    await page.goto("/en/admin/events");
    const checkbox = page.locator("input[type='checkbox']").first();
    const isChecked = await checkbox.isChecked();
    if (!isChecked) {
      await checkbox.click();
      await page.waitForTimeout(500);
    }

    await page.goto("/en");
    await expect(page.locator("#marutam")).toBeVisible();
  });

  test("TC-REQ-202603-011-d: achievements disabled → submit form still accessible", async ({ page }) => {
    // Disable achievements
    await page.goto("/en/admin/achievements");
    const checkbox = page.locator("input[type='checkbox']").first();
    const isChecked = await checkbox.isChecked();
    if (isChecked) {
      await checkbox.click();
      await page.waitForTimeout(500);
    }

    // Submit form must still be accessible
    await page.goto("/en/achievements/submit");
    await expect(page.locator("h1")).toContainText("Submit Achievement");

    // Re-enable for cleanup
    await page.goto("/en/admin/achievements");
    const cb = page.locator("input[type='checkbox']").first();
    if (!(await cb.isChecked())) await cb.click();
  });
});

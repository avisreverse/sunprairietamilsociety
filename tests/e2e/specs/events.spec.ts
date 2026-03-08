import { test, expect } from "@playwright/test";

/**
 * E2E tests — Events listing, detail page, and RSVP form.
 * @see REQ-202603-001 — Landing page events section
 * @see REQ-202603-007 — RSVP page
 * @see DEF-202603-008 — RSVP page not built (fixed)
 */

test.describe("Events listing page", () => {
  test("loads /en/events with nav and footer", async ({ page }) => {
    await page.goto("/en/events");

    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator("h1")).toContainText("Upcoming Events");
    await expect(page.locator("footer")).toBeVisible();
  });

  test("shows events list or empty state", async ({ page }) => {
    await page.goto("/en/events");

    const hasEvents = await page.locator("a[href*='/events/']").count() > 0;
    if (hasEvents) {
      // First event card is clickable
      const firstCard = page.locator("a[href*='/events/']").first();
      await expect(firstCard).toBeVisible();
    } else {
      // Empty state message
      await expect(page.locator("text=No upcoming events")).toBeVisible();
    }
  });

  test("clicking an event card navigates to detail page", async ({ page }) => {
    await page.goto("/en/events");

    const eventLinks = page.locator("a[href*='/events/']");
    const count = await eventLinks.count();

    if (count > 0) {
      const href = await eventLinks.first().getAttribute("href");
      await eventLinks.first().click();
      await expect(page).toHaveURL(new RegExp(href!.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      await expect(page.locator("h1")).toBeVisible();
    }
  });
});

test.describe("Event detail page", () => {
  test("shows 404 for unknown event ID", async ({ page }) => {
    const response = await page.goto("/en/events/00000000-0000-0000-0000-000000000000");
    expect(response?.status()).toBe(404);
  });
});

test.describe("RSVP form", () => {
  test("RSVP page returns 404 for non-existent event", async ({ page }) => {
    const response = await page.goto("/en/events/00000000-0000-0000-0000-000000000000/rsvp");
    expect(response?.status()).toBe(404);
  });
});

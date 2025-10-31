import { test, expect } from "@playwright/test";

test("home page has Playwright in the title @smoke", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect(page).toHaveTitle(/Playwright/);
  await expect(page.getByRole("link", { name: /get started/i })).toBeVisible();
});

import { test, expect } from "@playwright/test";

test.describe("@smoke smoke suite", () => {
  test("home page has Playwright in the title", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    await expect(page).toHaveTitle(/Playwright/);
    await expect(
      page.getByRole("link", { name: /get started/i })
    ).toBeVisible();
  });

  test("get started has the correct URL", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    const getStartedLink = page.getByRole("link", { name: /get started/i });
    await expect(getStartedLink).toBeVisible();
    await expect(getStartedLink).toHaveAttribute("href", "/docs/intro");
  });

  test("API link navigates to Playwright Library", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    //await page.waitForTimeout(2000);
    await page.getByRole("link", { name: "API" }).click();
    await expect(page).toHaveURL(
      "https://playwright.dev/docs/api/class-playwright"
    );
  });

  test("Python nav link points to language docs", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    const languageSwitcher = page
      .getByLabel("Main", { exact: true })
      .getByRole("button", { name: "Node.js" });
    await languageSwitcher.click();
    const pythonLink = page
      .getByLabel("Main", { exact: true })
      .getByRole("link", { name: "Python" });
    await expect(pythonLink).toBeVisible();
    await expect(pythonLink).toHaveAttribute("href", "/python/");
  });
});

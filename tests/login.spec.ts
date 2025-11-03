import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";

test.describe("Swag Labs login", () => {
  test("standard user can sign in", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");

    await expect(
      page.locator('[data-test="inventory-container"]')
    ).toBeVisible();
  });

  test("locked out user sees an error", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillCredentials("locked_out_user", "secret_sauce");
    await loginPage.submit();

    await loginPage.expectError("Sorry, this user has been locked out");
    await expect(page).toHaveURL(/\/$/);
  });
});

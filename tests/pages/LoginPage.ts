// tests/pages/LoginPage.ts
import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  // Locators grouped here keep tests clean & readable
  username = this.page.getByLabel("Email");
  password = this.page.getByLabel("Password");
  signIn = this.page.getByRole("button", { name: /sign in/i });

  async goto() {
    // BaseURL can be set in playwright.config.ts so we only write relative paths here.
    await this.page.goto("/login");
  }

  async login(email: string, pwd: string) {
    await this.username.fill(email);
    await this.password.fill(pwd);
    await Promise.all([
      // Wait for navigation to ensure the app finished handling the login request.
      this.page.waitForNavigation(),
      this.signIn.click(),
    ]);
  }

  async expectError(text: string) {
    // Basic assertion pattern to verify validation or auth errors.
    await expect(this.page.getByRole("alert")).toHaveText(
      new RegExp(text, "i")
    );
  }
}

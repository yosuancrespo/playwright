import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  // Swag Labs exposes stable data-test attributes we can rely on.
  private readonly usernameField = this.page.locator('[data-test="username"]');
  private readonly passwordField = this.page.locator('[data-test="password"]');
  private readonly signInButton = this.page.locator(
    '[data-test="login-button"]'
  );
  private readonly errorBanner = this.page.locator('[data-test="error"]');

  async goto() {
    // Root route renders the login form when baseURL points to saucedemo.
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.fillCredentials(username, password);
    await Promise.all([
      this.page.waitForURL(/\binventory\.html$/),
      this.signInButton.click(),
    ]);
  }

  async expectError(text: string) {
    await expect(this.errorBanner).toContainText(new RegExp(text, "i"));
  }

  async fillCredentials(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
  }

  async submit() {
    await this.signInButton.click();
  }
}

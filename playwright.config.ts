import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  // Generate an HTML report so `npx playwright show-report` works.
  reporter: [["html", { open: "never" }], ["list"]],

  use: {
    // Helpful artifacts for triage during the interview
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",

  baseURL: "https://www.saucedemo.com",
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});

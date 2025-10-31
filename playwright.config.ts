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

    // Optional: change later if you demo a real web app
    baseURL: "https://example.com",
  },

  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});

// tests/auth.spec.ts
// Auth demo with Postman Echo's Basic Auth endpoint.
// Success: send correct Basic header → 200 + { authenticated: true }
// Negative: no/invalid header → 401

import { test, expect } from "@playwright/test";

test.describe("@api postman basic auth", () => {
  test("login success returns authenticated true", async ({ request }) => {
    const username = "postman";
    const password = "password";

    // Build Basic Authorization header: base64("user:pass")
    const auth = Buffer.from(`${username}:${password}`).toString("base64");

    const res = await request.get("https://postman-echo.com/basic-auth", {
      headers: { Authorization: `Basic ${auth}` },
      timeout: 15000,
    });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ authenticated: true });
  });

  test("login fails when credentials are missing (negative test)", async ({
    request,
  }) => {
    // Same endpoint without Authorization header → 401 Unauthorized
    const res = await request.get("https://postman-echo.com/basic-auth", {
      timeout: 15000,
    });
    expect(res.status()).toBe(401);
  });
});

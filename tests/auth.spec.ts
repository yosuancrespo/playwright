// tests/auth.spec.ts
// Auth demo with httpbin's Basic Auth endpoint.
// Success: send correct Basic header → 200 + { authenticated: true, user }
// Negative: no/invalid header → 401

import { test, expect } from "@playwright/test";

test.describe("@api httpbin basic auth", () => {
  test("login success returns authenticated true", async ({ request }) => {
    const username = "eagleye";
    const password = "secret";

    // Build Basic Authorization header: base64("user:pass")
    const auth = Buffer.from(`${username}:${password}`).toString("base64");

    const res = await request.get(
      `https://httpbin.org/basic-auth/${username}/${password}`,
      { headers: { Authorization: `Basic ${auth}` } }
    );

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.authenticated).toBe(true);
    expect(body.user).toBe(username);
  });

  test("login fails when credentials are missing (negative test)", async ({
    request,
  }) => {
    // Same endpoint without Authorization header → 401 Unauthorized
    const res = await request.get(
      "https://httpbin.org/basic-auth/eagleye/secret"
    );
    expect(res.status()).toBe(401);
  });
});

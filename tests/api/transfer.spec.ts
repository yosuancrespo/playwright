// tests/api/transfer.spec.ts
// "Transfer-like" flow using Postman Echo (public echo service).
// Shows POST (create), PUT (update), and GET (pagination-like params).

import { test, expect } from "@playwright/test";

test.describe('@api Postman Echo "transfer" demos', () => {
  test('create "transfer" echoes payload + idempotency header', async ({
    request,
  }) => {
    // Newbies note: this payload simulates a money-movement request.
    const payload = {
      from: "A123",
      to: "B456",
      amount: 100.0,
      currency: "USD",
    };
    const idemKey = `idem-${Date.now()}`; // unique per request to avoid duplicates

    const res = await request.post("https://postman-echo.com/post", {
      headers: {
        "Content-Type": "application/json",
        // Servers/proxies may rewrite header names but should keep the value.
        "Idempotency-Key": idemKey,
      },
      data: payload,
    });

    expect(res.status()).toBe(200); // Echo returns 200 OK for POST
    const body = await res.json();

    // body.json contains exactly what we sent
    expect(body.json).toEqual(payload);

    // Headers in Postman Echo are lowercased; make a lowercase map to be safe.
    const headersLower: Record<string, string> = Object.fromEntries(
      Object.entries(body.headers || {}).map(([k, v]) => [
        k.toLowerCase(),
        String(v),
      ])
    );

    // Accept either 'idempotency-key' or 'x-idempotency-key' depending on upstream behavior.
    const echoedIdem =
      headersLower["idempotency-key"] ?? headersLower["x-idempotency-key"];

    // Make sure a value exists and matches what we sent.
    expect(echoedIdem).toBeDefined();
    expect(echoedIdem).toBe(idemKey);
  });

  test('update "transfer" (PUT) echoes payload back', async ({ request }) => {
    const update = { to: "C789", amount: 125.5 };

    const res = await request.put("https://postman-echo.com/put", {
      headers: { "Content-Type": "application/json" },
      data: update,
    });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.json).toEqual(update);
    // Content-Type shows the server parsed JSON
    expect(String(body.headers["content-type"]).toLowerCase()).toContain(
      "application/json"
    );
  });

  test('list "transfers" (GET) supports query params', async ({ request }) => {
    const res = await request.get("https://postman-echo.com/get", {
      params: { page: "2", pageSize: "3" },
    });

    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.args.page).toBe("2");
    expect(body.args.pageSize).toBe("3");
  });
});

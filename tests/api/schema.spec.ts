import { test, expect } from "@playwright/test";
import { z } from "zod";

const TransferEchoResponse = z.object({
  args: z.object({
    amount: z.string(),
    currency: z.string().length(3),
  }),
  url: z.string().url(),
});

test.describe("@api schema validation", () => {
  test("validates transfer echo payload shape", async ({ request }) => {
    const res = await request.get(
      "https://postman-echo.com/get?amount=100&currency=USD"
    );
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    const parsed = TransferEchoResponse.safeParse(body);
    expect(parsed.success).toBe(true);

    if (parsed.success) {
      expect(parsed.data.args.amount).toBe("100");
      expect(parsed.data.args.currency).toBe("USD");
    }
  });
});

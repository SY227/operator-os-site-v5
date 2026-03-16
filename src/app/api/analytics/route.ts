import { NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/analytics/server";
import { isNonEmptyString, normalizeString } from "@/lib/validation";

const allowedEventNames = new Set([
  "page_view",
  "cta_click",
  "newsletter_submit",
  "contact_submit",
]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = normalizeString(body?.name);
    const path = normalizeString(body?.path) || undefined;

    if (!isNonEmptyString(name) || !allowedEventNames.has(name)) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "INVALID_EVENT_NAME",
            message: "Unsupported analytics event name.",
          },
        },
        { status: 400 },
      );
    }

    await trackServerEvent({
      name: name as "page_view" | "cta_click" | "newsletter_submit" | "contact_submit",
      path,
      properties:
        body?.properties && typeof body.properties === "object"
          ? body.properties
          : undefined,
      timestamp: normalizeString(body?.timestamp) || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "BAD_REQUEST",
          message: "Invalid analytics payload.",
        },
      },
      { status: 400 },
    );
  }
}

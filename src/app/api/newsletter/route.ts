import { NextResponse } from "next/server";
import { submitLead } from "@/lib/leads";
import { trackServerEvent } from "@/lib/analytics/server";
import { isValidEmail, normalizeString } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = normalizeString(body?.email).toLowerCase();
    const sourcePath = normalizeString(body?.sourcePath) || "/";

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "INVALID_EMAIL",
            message: "Please provide a valid email address.",
            fields: ["email"],
          },
        },
        { status: 400 },
      );
    }

    const leadResult = await submitLead({
      type: "newsletter",
      email,
      sourcePath,
      createdAt: new Date().toISOString(),
      payload: {
        email,
        sourcePath,
      },
    });

    await trackServerEvent({
      name: "newsletter_submit",
      path: sourcePath,
      properties: { emailDomain: email.split("@")[1] ?? "unknown" },
    });

    return NextResponse.json({
      ok: true,
      message: "You’re on the list. Expect practical systems and workflows soon.",
      warning: leadResult.warning,
      storage: {
        persisted: leadResult.persisted,
        providers: leadResult.results,
      },
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "BAD_REQUEST",
          message: "Unable to process newsletter signup payload.",
        },
      },
      { status: 400 },
    );
  }
}

import { NextResponse } from "next/server";
import { submitLead } from "@/lib/leads";
import { trackServerEvent } from "@/lib/analytics/server";
import {
  isNonEmptyString,
  isValidEmail,
  normalizeString,
} from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = normalizeString(body?.name);
    const email = normalizeString(body?.email).toLowerCase();
    const message = normalizeString(body?.message);
    const topic = normalizeString(body?.topic);
    const sourcePath = normalizeString(body?.sourcePath) || "/contact";

    const invalidFields: string[] = [];

    if (!isNonEmptyString(name)) invalidFields.push("name");
    if (!isValidEmail(email)) invalidFields.push("email");
    if (!isNonEmptyString(message) || message.length < 10) invalidFields.push("message");

    if (invalidFields.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "VALIDATION_ERROR",
            message:
              "Please provide name, valid email, and a message of at least 10 characters.",
            fields: invalidFields,
          },
        },
        { status: 400 },
      );
    }

    const leadResult = await submitLead({
      type: "contact",
      name,
      email,
      sourcePath,
      createdAt: new Date().toISOString(),
      payload: {
        name,
        email,
        message,
        topic,
        sourcePath,
      },
    });

    await trackServerEvent({
      name: "contact_submit",
      path: sourcePath,
      properties: {
        topic: topic || "general",
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Thanks — your message is in. We’ll follow up shortly.",
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
          message: "Unable to process contact form payload.",
        },
      },
      { status: 400 },
    );
  }
}

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error: {
        code: "CHATBOT_BETA_PREVIEW_ONLY",
        message:
          "CogniFox chatbot backend is in beta preview mode. Retrieval + moderation are not wired to production yet.",
      },
    },
    { status: 501 },
  );
}

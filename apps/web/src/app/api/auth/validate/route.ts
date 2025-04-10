import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { validateSessionToken } from "@tutly/auth";

export async function GET() {
  const headersList = await headers();
  const sessionId = headersList.get("x-session-id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "No session ID provided" },
      { status: 401 },
    );
  }

  try {
    const result = await validateSessionToken(sessionId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[Session] Error validating session:", error);
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
}

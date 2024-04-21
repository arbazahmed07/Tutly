import { createResponse } from "@/actions/doubts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { doubtId, description } = await request.json();

  try {
    const doubt = await createResponse(doubtId, description);
    return NextResponse.json(doubt);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

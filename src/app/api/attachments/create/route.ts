import { createAttachment } from "@/actions/attachments";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    const attachment = await createAttachment(data);
    return NextResponse.json(attachment);
  } catch (e :any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
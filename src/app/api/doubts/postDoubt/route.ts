import { createDoubt } from "@/actions/doubts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { classId, title, description } = await request.json();

  try {
    const doubt = await createDoubt(classId, title, description);
    return NextResponse.json(doubt);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

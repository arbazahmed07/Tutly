import { updatePoints } from "@/actions/points";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { submissionId, score, category } = await request.json();

  try {
    const points = await updatePoints(submissionId, score, category);
    return NextResponse.json(points);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

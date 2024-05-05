import getCurrentUser from "@/actions/getCurrentUser";
import { updatePoints } from "@/actions/points";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser()
  if(!user || user.role==="STUDENT"){
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }
  const { submissionId, score, category } = await request.json();
  try {
    const points = await updatePoints(submissionId, score, category);
    console.log(points);
    return NextResponse.json(points);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

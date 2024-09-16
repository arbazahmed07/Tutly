import getCurrentUser from "@/actions/getCurrentUser";
import addPoints from "@/actions/points";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role === "STUDENT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }
  const { submissionId, marks } = await request.json();

  try {
    const points = await addPoints({ submissionId, marks });
    return NextResponse.json(points);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 401 });
  }
}

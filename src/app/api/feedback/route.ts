import getCurrentUser from "@/actions/getCurrentUser";
import { addOverallFeedback } from "@/actions/submission";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role === "STUDENT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }

  const { submissionId, feedback } = await request.json();

  try {
    const updatedSubmission = await addOverallFeedback(submissionId, feedback);

    return NextResponse.json(updatedSubmission);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 401 });
  }
}

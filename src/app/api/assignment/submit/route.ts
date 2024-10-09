import getCurrentUser from "@/actions/getCurrentUser";
import {
  type AssignmentDetails,
  createSubmission,
  type MentorDetails,
} from "@/actions/submission";
import { type NextRequest, NextResponse } from "next/server";
import { type InputJsonValue } from "@prisma/client/runtime/library";

interface SubmissionData {
  assignmentDetails: AssignmentDetails;
  files: InputJsonValue;
  mentorDetails: MentorDetails;
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as SubmissionData;
  const { assignmentDetails, files, mentorDetails } = data;

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    if (currentUser.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const response = await createSubmission(
      assignmentDetails,
      files,
      mentorDetails,
    );
    if (!response) {
      return NextResponse.json(
        { error: "Error submitting assignment" },
        { status: 400 },
      );
    }
    return NextResponse.json({ success: "Assignment submitted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Error submitting assignment" },
      { status: 400 },
    );
  }
}

import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

interface SubmissionData {
  assignmentId: string;
  externalLink: string;
  maxSubmissions: number;
  courseId: string;
}

export async function POST(request: NextRequest) {
  const { assignmentId, externalLink, maxSubmissions, courseId } =
    (await request.json()) as SubmissionData;

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    if (currentUser.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const prevSubmissions = await db.submission.findMany({
      where: {
        attachmentId: assignmentId,
        enrolledUser: {
          username: currentUser.username,
        },
      },
    });

    if (prevSubmissions.length >= maxSubmissions) {
      return NextResponse.json({ message: "Maximum submission limit reached" });
    }

    const enrolledUser = await db.enrolledUsers.findFirst({
      where: {
        courseId: courseId,
        username: currentUser.username,
      },
    });

    if (!enrolledUser) {
      return NextResponse.json(
        { error: "User not enrolled in the course" },
        { status: 400 },
      );
    }

    await db.submission.create({
      data: {
        enrolledUserId: enrolledUser.id,
        attachmentId: assignmentId,
        submissionLink: externalLink,
      },
    });

    return NextResponse.json({ success: "Assignment submitted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Error submitting assignment" },
      { status: 400 },
    );
  }
}

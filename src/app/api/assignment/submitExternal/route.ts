import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { assignmentId, externalLink, maxSubmissions, courseId } =
    await request.json();

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

    const res = await db.submission.create({
      data: {
        enrolledUserId: enrolledUser.id,
        attachmentId: assignmentId,
        submissionLink: externalLink,
      },
    });

    return NextResponse.json({ success: "Assignment submitted successfully" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

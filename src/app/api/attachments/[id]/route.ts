import { getAssignmentDetailsByUserId } from "@/actions/assignments";
import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    const assignment = await getAssignmentDetailsByUserId(
      params.id,
      currentUser.id
    );

    if (!assignment) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 400 }
      );
    }

    if (!assignment.class?.courseId) {
      return NextResponse.json({ error: "Course not found" }, { status: 400 });
    }

    const mentorDetails = await db.enrolledUsers.findFirst({
      where: {
        username: currentUser.username,
        courseId: assignment.class.courseId,
      },
      select: {
        mentor: {
          select: {
            name: true,
            email: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json({ assignment, currentUser, mentorDetails });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

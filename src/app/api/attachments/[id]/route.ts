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
            username: true,
          },
        },
      },
    });

    return NextResponse.json({
      assignment: {
        id: assignment.id,
        title: assignment.title,
        link: assignment.link,
        class: {
          id: assignment.class.id,
          title: assignment.class.title,
          courseId: assignment.class.courseId,
          course: {
            id: assignment.class.course?.id,
            title: assignment.class.course?.title,
          },
        },
        submissions: assignment.submissions.map((submission) => {
          return {
            id: submission.id,
          };
        }),
      },
      currentUser: {
        username: currentUser.username,
        name: currentUser.name,
        email: currentUser.email,
      },
      mentorDetails,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

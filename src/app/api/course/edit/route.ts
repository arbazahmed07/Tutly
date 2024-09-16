import { updateCourse } from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
import { type NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { id, title, isPublished, image } = await req.json();

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    if (currentUser.role !== "INSTRUCTOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const course = await updateCourse({ id, title, isPublished, image });

    if (!course) {
      return NextResponse.json(
        { error: "Failed to update course" },
        { status: 401 },
      );
    }

    return NextResponse.json({ course });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

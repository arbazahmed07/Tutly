import { createCourse } from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
import { type NextRequest, NextResponse } from "next/server";

interface CourseType {
  title: string;
  isPublished: boolean;
  image: string;
}

export async function POST(request: NextRequest) {
  const { title, isPublished, image } = (await request.json()) as CourseType;
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    if (currentUser.role !== "INSTRUCTOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const course = await createCourse({ title, isPublished, image });

    if (!course) {
      return NextResponse.json(
        { error: "Failed to add newClass" },
        { status: 400 },
      );
    }

    return NextResponse.json(course);
  } catch {
    return NextResponse.json(
      { error: "Error creating course" },
      { status: 400 },
    );
  }
}

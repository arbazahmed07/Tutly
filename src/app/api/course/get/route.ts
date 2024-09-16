import { getAllCourses } from "@/actions/courses";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const courses = await getAllCourses();

    if (!courses) {
      return NextResponse.json(
        { error: "Failed to fetch courses" },
        { status: 401 },
      );
    }

    return NextResponse.json({ courses }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

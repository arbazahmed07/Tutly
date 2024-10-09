import { getAllCourses } from "@/actions/courses";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const courses = await getAllCourses();

    if (!courses) {
      return NextResponse.json(
        { error: "Failed to fetch courses" },
        { status: 401 },
      );
    }

    return NextResponse.json({ courses }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Error getting courses" },
      { status: 400 },
    );
  }
}

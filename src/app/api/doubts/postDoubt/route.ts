import { createDoubt } from "@/actions/doubts";
import getCurrentUser from "@/actions/getCurrentUser";
import { type NextRequest, NextResponse } from "next/server";

interface PostDoubtType {
  courseId: string;
  title: string;
  description: string;
}

export async function POST(request: NextRequest) {
  const { courseId, title, description } =
    (await request.json()) as PostDoubtType;
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser)
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    const doubt = await createDoubt(courseId, title, description);
    return NextResponse.json(doubt);
  } catch {
    return NextResponse.json({ error: "Error posting doubt" }, { status: 400 });
  }
}

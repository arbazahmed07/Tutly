import getCurrentUser from "@/actions/getCurrentUser";
import addPoints from "@/actions/points";
import { type pointCategory } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

interface PointsType {
  submissionId: string;
  marks: {
    category: pointCategory;
    score: number;
  }[];
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role === "STUDENT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }
  const { submissionId, marks } = (await request.json()) as PointsType;

  try {
    const points = await addPoints({ submissionId, marks });
    return NextResponse.json(points);
  } catch {
    return NextResponse.json({ error: "Error adding points" }, { status: 401 });
  }
}

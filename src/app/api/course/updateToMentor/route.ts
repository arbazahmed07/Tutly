import { NextResponse, type NextRequest } from "next/server";
import { updateRole } from "@/actions/courses";
import { type Role } from "@prisma/client";

interface UpdateToMentorType {
  username: string;
  role: Role;
}

export async function POST(request: NextRequest) {
  const { username, role } = (await request.json()) as UpdateToMentorType;

  try {
    const user = await updateRole(username, role);

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: "Error updating to mentor" },
      { status: 400 },
    );
  }
}

import { NextResponse, type NextRequest } from "next/server";
import { updateRole } from "@/actions/courses";

export async function POST(request: NextRequest) {
  const { username, role } = await request.json();

  try {
    const user = await updateRole(username, role);

    return NextResponse.json(user);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

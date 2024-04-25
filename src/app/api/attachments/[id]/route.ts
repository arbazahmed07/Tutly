import { getAssignmentDetailsByUserId } from "@/actions/assignments";
import getCurrentUser from "@/actions/getCurrentUser";
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
    return NextResponse.json({ assignment, currentUser });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

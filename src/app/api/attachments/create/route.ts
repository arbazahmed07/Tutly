import { createAttachment } from "@/actions/attachments";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const currentUser = await getCurrentUser();
    if(!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    if(currentUser.role !== "INSTRUCTOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    
    
    const attachment = await createAttachment(data);
    return NextResponse.json(attachment);
  } catch (e :any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
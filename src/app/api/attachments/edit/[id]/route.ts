import { editAttachment } from "@/actions/attachments";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
request: NextRequest,
{ params }: { params: { id: string } }
) {
    console.log(params.id,'params.id');
    
try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    if(currentUser.role !== "INSTRUCTOR") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await request.json();

    const assignment = await editAttachment(params.id,data );
    return NextResponse.json({ assignment });
} catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
}
}

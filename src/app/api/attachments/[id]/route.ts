import { getAssignmentDetailsById } from "@/actions/getAssignments";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: {id: string }}) {
    try {
        const assignment = await getAssignmentDetailsById(params.id);
        const currentUser = await getCurrentUser();
        return NextResponse.json({ assignment, currentUser });
    } catch (e :any) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}

import { getClassDetails } from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse,NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { classId: string } }) {
    
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser ||currentUser.role !== "INSTRUCTOR") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
        }
        const myClass = await getClassDetails(params.classId);
        return NextResponse.json(myClass);
    }
    catch(e:any) {
        return NextResponse.json({error: e.message}, {status: 400});
    }
}
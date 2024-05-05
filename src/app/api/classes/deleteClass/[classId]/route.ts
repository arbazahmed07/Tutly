import { NextResponse,NextRequest } from "next/server";
import { deleteClass } from "@/actions/classes";
import getCurrentUser from "@/actions/getCurrentUser";

export async function DELETE(req: NextRequest,{ params }: { params: {classId: string }}) {
    console.log(params.classId);
    
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
        if(currentUser.role !== "INSTRUCTOR") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const res = await deleteClass(params.classId);
        
        if(res.success)
            return NextResponse.json({ message: 'Class deleted successfully' });
        
    } catch (error :any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
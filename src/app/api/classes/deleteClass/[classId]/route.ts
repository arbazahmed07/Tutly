import { NextResponse,NextRequest } from "next/server";
import { deleteClass } from "@/actions/classes";

export async function DELETE(req: NextRequest,{ params }: { params: {classId: string }}) {
    console.log(params.classId);
    
    try {
        const res = await deleteClass(params.classId);
        
        if(res.success)
            return NextResponse.json({ message: 'Class deleted successfully' });
        
    } catch (error :any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
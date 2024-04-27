
import { getClassDetails } from "@/actions/courses";
import { NextResponse,NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { classId: string } }) {
    
    try{
        const myClass = await getClassDetails(params.classId);
        return NextResponse.json(myClass);
    }
    catch(e:any){
        return NextResponse.json({error: e.message}, {status: 400});
    }
}
import { db } from "@/lib/db";


export default async function addPoints({ submissionId, marks }  : { submissionId: string, marks: any }) {
    try{
        const previousMarks = await db.point.findMany({
            where: {
                submissionId
            }
        });
        if(previousMarks.length > 0){
            throw  "Points already added for this submission";
        }   

            
        const allCategories = await db.point.createMany({
            data: marks.map((mark : any) => {
                return {
                    submissionId,
                    category : mark.category,
                    score: mark.score
                }
            })
        });
        
        return allCategories;
        
    }
    catch(e : any){
        throw new Error(e.message);
    }
}
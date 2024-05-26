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

        await mergeAndDeleteBranch(submissionId);
        
        return allCategories;
        
    }
    catch(e : any){
        throw new Error(e.message);
    }
}

const { Octokit } = require('@octokit/rest');

export async function mergeAndDeleteBranch (submissionId:string){
    const submission = await db.submission.findUnique({
        where: {
            id: submissionId
        }
    });

    const octokit = new Octokit({
        auth: process.env.GITHUB_PAT,
      });

    const owner = "GoodKodersUnV";
    const repo = "LMS-DATA";
    const prLink = submission?.submissionLink 

    if (!prLink) {
        throw new Error("PR Link not found");
    }

    const response = await octokit.pulls.get({
        owner,
        repo,
        pull_number: Number(prLink.split("/").pop())
    });

    const pr = response.data;

    if (pr.merged) {
        return;
    }
    
    await octokit.pulls.merge({
        owner,
        repo,
        pull_number: pr.number
    });

    await octokit.git.deleteRef({
        owner,
        repo,
        ref: `heads/${pr.head.ref}`
    });
}
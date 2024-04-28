import { getAllAssignedAssignmentsByUserId } from "@/actions/assignments";
import Loader from "@/components/Loader";
import UnSubmittedAssignmentBoard from "@/components/UnSubmittedAssignmentBoard";
import { Suspense } from "react";



export default async function mentorAssignments({ params }: {
params: {
    id: string
}
}) {
const { courses, coursesWithAssignments } = await getAllAssignedAssignmentsByUserId(params.id)

return (
    
    <div className="mx-2 md:mx-6 px-2 md:px-8 py-2 flex flex-col gap-4">
    <h1 className="text-center text-3xl font-semibold py-2">ASSIGNMENTS</h1>
    <Suspense fallback={<Loader/>}>
        {!coursesWithAssignments||coursesWithAssignments.length===0 ? <div className="text-center">No Assignments found!</div> : <UnSubmittedAssignmentBoard reviewed ={true} courses={courses} assignments={coursesWithAssignments} userId={params.id} />}
    </Suspense>
    </div>
);
}

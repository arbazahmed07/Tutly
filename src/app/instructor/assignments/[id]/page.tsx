import { getAllAssignedAssignmentsByUserId } from "@/actions/assignments";
import AssignmentBoard from "@/components/assignmentBoard";
import Image from "next/image";



export default async function mentorAssignments({ params }: {
  params: {
    id: string
  }
}) {
  const { courses, coursesWithAssignments } = await getAllAssignedAssignmentsByUserId(params.id)
  return (
    
    <div className="mx-2 md:mx-6 px-2 md:px-8 py-2 flex flex-col gap-4">
      <h1 className="text-center text-3xl font-semibold py-2 max-sm:text-2xl">ASSIGNMENTS</h1>
      {!coursesWithAssignments||coursesWithAssignments.length===0 ? <div className="text-center">No Assignments found!</div> : 
        <div className=" text-center w-full flex justify-center items-center mt-5" >
            <Image 
                src="https://i.postimg.cc/jSvL48Js/oops-404-error-with-broken-robot-concept-illustration-114360-1932-removebg-preview.png" 
                alt="404" 
                width={500}
                height={500}
            />
        </div>
      }
    </div>
  );
}

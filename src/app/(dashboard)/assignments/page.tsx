import { getEnrolledCourses } from "@/actions/courses";
import { getAllAssignedAssignments } from "@/actions/assignments";
import AssignmentBoard from "@/components/assignmentBoard";
import Loader from "@/components/Loader";
import { Suspense } from "react";

export default async function Assignments() {
  const assignments = await getAllAssignedAssignments();
  const courses = await getEnrolledCourses();

  return (
    <div className="mx-2 md:mx-14 px-2 md:px-8 py-2 flex flex-col gap-4">
      <h1 className="text-center text-xl font-bold py-2">ASSIGNMENTS</h1>

      {
        !assignments ? <div className="text-center">No Attachments found!</div> :
          <Suspense fallback={<Loader />}>
            <AssignmentBoard reviewed={true} courses={courses} assignments={assignments} />
          </Suspense>
      }
    </div>
  );
}

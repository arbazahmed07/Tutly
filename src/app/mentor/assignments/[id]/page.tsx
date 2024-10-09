import {
  getEnrolledCourses,
  getMentorCourses,
  getMentorStudents,
} from "@/actions/courses";
import {
  getAllAssignedAssignments,
  getAllAssignedAssignmentsByUserId,
  getAllMentorAssignments,
} from "@/actions/assignments";
import AssignmentBoard from "@/components/assignmentBoard";

export default async function mentorAssignments({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { courses, coursesWithAssignments } =
    await getAllAssignedAssignmentsByUserId(params.id);
  return (
    <div className="flex flex-col gap-4 px-2 py-2 md:mx-6 md:px-8">
      <h1 className="py-2 text-center text-3xl font-semibold">ASSIGNMENTS</h1>
      {!coursesWithAssignments || !courses ? (
        <div className="text-center">No Attachments found!</div>
      ) : (
        <AssignmentBoard
          courses={courses}
          assignments={coursesWithAssignments}
          userId={params.id}
        />
      )}
    </div>
  );
}

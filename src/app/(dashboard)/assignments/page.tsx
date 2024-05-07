import { getEnrolledCourses } from "@/actions/courses";
import { getAllAssignedAssignments } from "@/actions/assignments";
import AssignmentBoard from "@/components/assignmentBoard";
import Loader from "@/components/Loader";
import { Suspense } from "react";
import Image from "next/image";
import SingleAssignmentBoard from "@/components/assignmentBoard";
import StudentWiseAssignments from "@/components/StudentWiseAssignments";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function Assignments() {
  const assignments = await getAllAssignedAssignments();
  const courses = await getEnrolledCourses();
  const currentUser = await getCurrentUser();

  return (
    <div className="mx-2 md:mx-14 px-2 md:px-8 py-2 flex flex-col gap-4">
      <h1 className="text-center text-xl font-bold py-2">ASSIGNMENTS</h1>

      {!courses || courses.length === 0 ? (
        <div className="p-4 font-semibold text-center mt-20">
          <Image
            src="https://i.postimg.cc/N0JMHNDw/undraw-Notify-re-65on-1-removebg-preview.png"
            height={400}
            className="m-auto "
            width={400}
            alt=""
          />
          <h1>No Assignments available</h1>
        </div>
      ) : (
        <Suspense fallback={<Loader />}>
          <StudentWiseAssignments
            courses={courses}
            assignments={assignments}
            userId={currentUser?.id}
          />
        </Suspense>
      )}
    </div>
  );
}

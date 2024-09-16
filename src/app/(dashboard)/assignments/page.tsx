import { getEnrolledCourses } from "@/actions/courses";
import { getAllAssignedAssignments } from "@/actions/assignments";
import AssignmentBoard from "@/components/assignmentBoard";
import Loader from "@/components/Loader";
import { Suspense } from "react";
import Image from "next/image";

export default async function Assignments() {
  const assignments = await getAllAssignedAssignments();
  const courses = await getEnrolledCourses();

  return (
    <div className="mx-2 flex flex-col gap-4 px-2 py-2 md:mx-14 md:px-8">
      <h1 className="py-2 text-center text-xl font-bold">ASSIGNMENTS</h1>

      {!courses || courses.length === 0 ? (
        <div className="mt-20 p-4 text-center font-semibold">
          <Image
            unoptimized
            src="https://i.postimg.cc/N0JMHNDw/undraw-Notify-re-65on-1-removebg-preview.png"
            height={400}
            className="m-auto"
            width={400}
            alt=""
          />
          <h1>No Assignments available</h1>
        </div>
      ) : (
        <Suspense fallback={<Loader />}>
          <AssignmentBoard
            reviewed={true}
            courses={courses}
            assignments={assignments}
          />
        </Suspense>
      )}
    </div>
  );
}

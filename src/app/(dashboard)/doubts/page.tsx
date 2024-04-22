import { getEnrolledCourses } from "@/actions/courses";
import StudentDoubts from "@/components/studentDoubts";

export default async function Assignments() {
  const courses = await getEnrolledCourses();

  return (
    <div className="mx-2 md:mx-14 px-2 md:px-8 py-2 flex flex-col gap-4">
      <h1 className="text-center text-xl font-bold border py-2">Ask doubt?</h1>
      {!courses ? <div className="text-center">No Courses enrolled!</div> : <StudentDoubts courses={courses}/>}
    </div>
  );
}

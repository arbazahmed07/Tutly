import { MdOutlineNoteAlt } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";

import { InstructorDashboardData } from "@/types/dashboard";

interface Props {
  data: InstructorDashboardData;
  selectedCourse: string;
}

export function InstructorCards({ data, selectedCourse }: Props) {
  const course = data.courses.find((c) => c.courseId === selectedCourse);

  return (
    <div>
      <div className="flex flex-wrap justify-center mb-10 gap-4">
        <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
          <MdOutlineNoteAlt className="m-auto h-24 w-24 text-blue-400" />
          <p className="pt-2 font-bold text-blue-600">{data.totalCourses}</p>
          <h1 className="p-1 text-sm font-bold">courses created</h1>
        </div>
        {course && (
          <>
            <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
              <SiGoogleclassroom className="m-auto h-24 w-24 text-blue-400" />
              <p className="pt-2 font-bold text-blue-600">{course.classCount}</p>
              <h1 className="p-1 text-sm font-bold">Classes in this course</h1>
            </div>
            <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
              <PiStudentBold className="m-auto h-24 w-24 text-blue-400" />
              <p className="pt-2 font-bold text-blue-600">{course.studentCount}</p>
              <h1 className="p-1 text-sm font-bold">Students enrolled in this course</h1>
            </div>
          </>
        )}
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}
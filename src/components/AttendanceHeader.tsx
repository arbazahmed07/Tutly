import { getAttedanceByClassId } from "@/actions/attendance";
import Link from "next/link";
import toast from "react-hot-toast";
import { BiSolidCloudUpload } from "react-icons/bi";
import AttendanceOfClass from "./attendanceOfClass";

export default function AttendanceHeader({
  pastpresentStudents,
  courses,
  currentCourse,
  setCurrentCourse,
  currentClass,
  setCurrentClass,
  openClasses,
  openCourses,
  setOpenClasses,
  setOpenCourses,
  onSelectFile,
  fileData,
  selectedFile,
  handleUpload,
}: any) {
  //   const attendance = await getAttedanceByClassId(currentClass.id);
  return (
    <>
      <div className="flex justify-between w-[80%] m-auto mt-8">
        <div className="flex gap-2 items-center">
          <div className="relative">
            {!currentCourse ? (
              <h1
                onClick={
                  courses?.length === 0
                    ? () => toast.error("no courses exist")
                    : () => setOpenCourses(!openCourses)
                }
                className="px-2 py-1 rounded bg-primary-700 min-w-28 cursor-pointer"
              >
                select course
              </h1>
            ) : (
              <h1
                onClick={() => setOpenCourses(!openCourses)}
                className="px-2 py-1 rounded bg-primary-700 min-w-28 cursor-pointer"
              >
                {currentCourse.title}
              </h1>
            )}
            <div className="flex flex-col absolute bg-primary-800 w-full">
              {openCourses &&
                courses?.map((course: any) => {
                  return (
                    <h1
                      onClick={() => {
                        setOpenCourses(!openCourses);
                        setCurrentCourse(course);
                      }}
                      className="border-b p-1 cursor-pointer hover:bg-primary-600"
                      key={course.id}
                    >
                      {course.title}
                    </h1>
                  );
                })}
            </div>
          </div>
          <div className="relative">
            {!currentClass ? (
              <h1
                onClick={
                  !currentCourse
                    ? () => toast.error("select course!")
                    : () => setOpenClasses(!openClasses)
                }
                className="px-2 py-1 rounded bg-primary-700 min-w-28 cursor-pointer"
              >
                select class
              </h1>
            ) : (
              <h1
                onClick={() => setOpenClasses(!openClasses)}
                className="px-2 py-1 rounded bg-primary-700 min-w-28 cursor-pointer"
              >
                {currentClass.title}
              </h1>
            )}
            <div className="flex flex-col absolute bg-primary-800 w-full">
              {openClasses &&
                currentCourse.classes.map((x: any) => {
                  return (
                    <h1
                      onClick={() => {
                        setCurrentClass(x);
                        setOpenClasses(!openClasses);
                      }}
                      className="border-b p-1 cursor-pointer hover:bg-primary-600"
                      key={x.id}
                    >
                      {x.title}
                    </h1>
                  );
                })}
            </div>
          </div>
        </div>
        {pastpresentStudents.length === 0 ? (
          <div className="flex gap-2 items-center">
            <input
              type="file"
              className="bg-primary-600 rounded cursor-pointer w-60 text-white font-semibold border-none outline-none shadow-md hover:bg-primary-700 transition duration-300 ease-in-out"
              accept=".csv, .xlsx"
              onChange={(e) => {
                const files = e.target.files;
                !currentClass
                  ? toast.error("select class")
                  : files && files.length > 0 && onSelectFile(files[0]);
              }}
            />
            {fileData && selectedFile && (
              <div
                onClick={handleUpload}
                className="bg-primary-600 rounded cursor-pointer px-2 py-1 flex items-center gap-2 hover:scale-x-105 hover:duration-500"
              >
                upload <BiSolidCloudUpload className="text-xl duration-1000" />
              </div>
            )}
          </div>
        ) : (
          <Link href={`/attendance/${currentClass.id}`} className="bg-primary-600 rounded px-2 py-1 hover:scale-105 hover:duration-500">
            Get Attendance
          </Link>
        )}
      </div>
    </>
  );
}

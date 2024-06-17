"use client";
import toast from "react-hot-toast";
import { BiSolidCloudUpload } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";

export default function AttendanceHeader({
  role,
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
  count,
}: any) {
  const handleDelete = async (x: any) => {
    try {
      const res = await axios.post("/api/attendance/delete", {
        classId: x,
      });
      toast.success("Attendance deleted successfully");
    } catch (e: any) {
      toast.error("Failed to delete attendance");
    }
  };
  return (
    <>
      {pastpresentStudents.length > 0 && (
        <>
          <div className="flex justify-center gap-6 mx-32 my-2 mb-6">
            <p className="text-sm text-primary-500 rounded-full p-0.5 px-3 border-l-2 border-r-2 border-primary-500">
              Present : {count[0]}
            </p>
            <p className="text-sm text-primary-500 rounded-full p-0.5 px-3 border-l-2 border-r-2 border-primary-500">
              Absent : {count[1]}
            </p>
          </div>
          <div className="mx-32 mb-2 flex">
            <p className="text-xs ms-1 p-0.5 rounded text-gray-400 px-2 border border-gray-400">
              {"<<"}60 : {count[2]}
            </p>
          </div>
        </>
      )}
      <div className="flex justify-between w-[80%] m-auto">
        <div className="flex gap-2 items-center">
          <div className="relative">
            {!currentCourse ? (
              <div
                onClick={
                  courses?.length === 0
                    ? () => toast.error("no courses exist")
                    : () => setOpenCourses(!openCourses)
                }
                className="px-2 py-1 rounded bg-primary-700 min-w-28 cursor-pointer flex items-center justify-between"
              >
                <h1>select course</h1>
                {openCourses ? (
                  <h1>
                    <FaCaretUp />
                  </h1>
                ) : (
                  <h1>
                    <FaCaretDown />
                  </h1>
                )}
              </div>
            ) : (
              <div
                onClick={() => setOpenCourses(!openCourses)}
                className="px-2 py-1 rounded bg-primary-700 min-w-28 cursor-pointer flex gap-2 items-center justify-between"
              >
                <h1>{currentCourse.title}</h1>
                {openCourses ? (
                  <h1>
                    <FaCaretUp />
                  </h1>
                ) : (
                  <h1>
                    <FaCaretDown />
                  </h1>
                )}
              </div>
            )}
            <div className="flex flex-col absolute bg-primary-800 w-full rounded max-h-[100px] overflow-y-scroll scrollbar-thin">
              {openCourses &&
                courses?.map((course: any) => {
                  return (
                    <h1
                      onClick={() => {
                        setOpenCourses(!openCourses);
                        setCurrentCourse(course);
                      }}
                      className="p-1 cursor-pointer hover:bg-primary-600"
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
              <div
                onClick={
                  !currentCourse
                    ? () => toast.error("select course!")
                    : () => setOpenClasses(!openClasses)
                }
                className="px-2 py-1 rounded bg-primary-700 min-w-28 cursor-pointer flex gap-2 items-center justify-between"
              >
                <h1>select class</h1>
                {openClasses ? (
                  <h1>
                    <FaCaretUp />
                  </h1>
                ) : (
                  <h1>
                    <FaCaretDown />
                  </h1>
                )}
              </div>
            ) : (
              <div
                onClick={() => setOpenClasses(!openClasses)}
                className="px-2 py-1 rounded bg-primary-700 min-w-28 cursor-pointer flex gap-2 items-center justify-between"
              >
                <h1>{currentClass.title}</h1>
                {openClasses ? (
                  <h1>
                    <FaCaretUp />
                  </h1>
                ) : (
                  <h1>
                    <FaCaretDown />
                  </h1>
                )}
              </div>
            )}
            <div className="flex flex-col absolute bg-primary-800 w-full rounded max-h-[100px] overflow-auto scrollbar-thin">
              {openClasses &&
                currentCourse.classes.map((x: any) => {
                  return (
                    <h1
                      onClick={() => {
                        setCurrentClass(x);
                        setOpenClasses(!openClasses);
                      }}
                      className="p-1 cursor-pointer hover:bg-primary-600"
                      key={x.id}
                    >
                      {x.title}
                    </h1>
                  );
                })}
            </div>
          </div>
        </div>

        {role == "INSTRUCTOR" &&
          (pastpresentStudents.length === 0 ? (
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
                  upload{" "}
                  <BiSolidCloudUpload className="text-xl duration-1000" />
                </div>
              )}
            </div>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="text-red-500 font-bold p-1 px-3 rounded-lg border-2 border-red-500 flex justify-center gap-1 items-center hover:scale-105 duration-500">
                  <h1>Delete</h1>
                  <MdDeleteOutline className="text-lg" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="border-none rounded-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Attendance</AlertDialogTitle>
                  <div className="flex gap-2">
                    <h1 className="rounded-full p-0.5 px-2 text-xs text-primary-700 border border-primary-700">
                      {currentCourse?.title}
                    </h1>
                    <h1 className="rounded-full p-0.5 px-2 text-xs text-primary-700 border border-primary-700">
                      {currentClass?.title}
                    </h1>
                  </div>
                  <p className="text-sm text-gray-500 pb-10 flex items-center gap-1">
                    Are you sure?
                    <br />
                    Continuing will clear the attendance of all students for
                    this class.
                  </p>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="mr-2 bg-gray-200 hover:bg-gray-300 text-black">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(currentClass?.id)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ))}
      </div>
    </>
  );
}

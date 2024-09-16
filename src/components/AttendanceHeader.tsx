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
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

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
  maxInstructionDuration,
  setMaxInstructionDuration,
}: any) {
  const router = useRouter();

  const handleDelete = async (x: any) => {
    try {
      const res = await axios.post("/api/attendance/delete", {
        classId: x,
      });
      toast.success("Attendance deleted successfully");
      router.refresh();
    } catch (e: any) {
      toast.error("Failed to delete attendance");
    }
  };

  const [clientMaxDuration, setClientMaxDuration] = useState<number>(
    maxInstructionDuration,
  );

  useEffect(() => {
    let maxDuration = 0;
    const calculateMaxDuration = () => {
      fileData?.forEach((student: any) => {
        if (student.Duration > maxDuration) {
          maxDuration = student.Duration;
        }
      });
      setClientMaxDuration(maxDuration);
      setMaxInstructionDuration(maxDuration);
    };

    if (fileData) {
      calculateMaxDuration();
    }
  }, [fileData, setMaxInstructionDuration]);

  const handleClientUpload = async () => {
    setMaxInstructionDuration(clientMaxDuration);

    await new Promise((resolve) => setTimeout(resolve, 100));

    handleUpload();
  };

  const handleClientMaxDuration = (e: any) => {
    const newDuration = parseInt(e.target.value);
    setClientMaxDuration(newDuration);
    setMaxInstructionDuration(newDuration);
  };

  return (
    <>
      {pastpresentStudents.length > 0 && (
        <>
          <div className="mx-32 my-2 mb-6 flex justify-center gap-6">
            <p className="rounded-full border-l-2 border-r-2 border-primary-500 p-0.5 px-3 text-sm text-primary-500">
              Present : {count[0]}
            </p>
            <p className="rounded-full border-l-2 border-r-2 border-primary-500 p-0.5 px-3 text-sm text-primary-500">
              Absent : {count[1]}
            </p>
          </div>
          <div className="mx-32 mb-2 flex">
            <p className="ms-1 rounded border border-gray-400 p-0.5 px-2 text-xs text-gray-400">
              {"<<"}60 : {count[2]}
            </p>
          </div>
        </>
      )}
      <div className="m-auto flex w-4/5 justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            {!currentCourse ? (
              <div
                onClick={
                  courses?.length === 0
                    ? () => toast.error("no courses exist")
                    : () => setOpenCourses(!openCourses)
                }
                className="flex min-w-28 cursor-pointer items-center justify-between rounded bg-primary-700 px-2 py-1"
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
                className="flex min-w-28 cursor-pointer items-center justify-between gap-2 rounded bg-primary-700 px-2 py-1"
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
            <div className="scrollbar-thin absolute flex max-h-[100px] w-full flex-col overflow-y-scroll rounded bg-primary-800">
              {openCourses &&
                courses?.map((course: any) => {
                  return (
                    <h1
                      onClick={() => {
                        setOpenCourses(!openCourses);
                        setCurrentCourse(course);
                      }}
                      className="cursor-pointer p-1 hover:bg-primary-600"
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
                className="flex min-w-28 cursor-pointer items-center justify-between gap-2 rounded bg-primary-700 px-2 py-1"
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
                className="flex min-w-28 cursor-pointer items-center justify-between gap-2 rounded bg-primary-700 px-2 py-1"
              >
                <h1>
                  {currentClass.title} (
                  {dayjs(currentClass.createdAt).format("DD-MM-YYYY")})
                </h1>
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
            <div className="scrollbar-thin absolute flex max-h-[100px] w-full flex-col overflow-auto rounded bg-primary-800">
              {openClasses &&
                currentCourse.classes.map((x: any) => {
                  return (
                    <h1
                      onClick={() => {
                        setCurrentClass(x);
                        setOpenClasses(!openClasses);
                      }}
                      className="cursor-pointer p-1 hover:bg-primary-600"
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
            <div className="flex items-center gap-2">
              <input
                type="file"
                className="w-60 cursor-pointer rounded border-none bg-primary-600 font-semibold text-white shadow-md outline-none transition duration-300 ease-in-out hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-gray-700"
                accept=".csv, .xlsx"
                disabled={!currentClass}
                onChange={(e) => {
                  const files = e.target.files;
                  !currentClass
                    ? toast.error("select class")
                    : files && files.length > 0 && onSelectFile(files[0]);
                }}
              />
              {fileData && selectedFile && (
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <input
                      type="number"
                      min={"0"}
                      value={clientMaxDuration}
                      onChange={handleClientMaxDuration}
                      placeholder="Max duration"
                      className="w-32 cursor-pointer rounded border-none bg-primary-600 px-2 py-1 font-semibold text-white shadow-md outline-none transition duration-300 ease-in-out placeholder:text-sm placeholder:text-gray-300 hover:bg-primary-700"
                    />
                  </div>
                  <div
                    onClick={handleClientUpload}
                    className="flex cursor-pointer items-center gap-2 rounded bg-primary-600 px-2 py-1 hover:scale-x-105 hover:duration-500"
                  >
                    upload{" "}
                    <BiSolidCloudUpload className="text-xl duration-1000" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="flex items-center justify-center gap-1 rounded-lg border-2 border-red-500 p-1 px-3 font-bold text-red-500 duration-500 hover:scale-105">
                  <h1>Delete</h1>
                  <MdDeleteOutline className="text-lg" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-2xl border-none">
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Attendance</AlertDialogTitle>
                  <div className="flex gap-2">
                    <h1 className="rounded-full border border-primary-700 p-0.5 px-2 text-xs text-primary-700">
                      {currentCourse?.title}
                    </h1>
                    <h1 className="rounded-full border border-primary-700 p-0.5 px-2 text-xs text-primary-700">
                      {currentClass?.title}
                    </h1>
                  </div>
                  <p className="flex items-center gap-1 pb-10 text-sm text-gray-500">
                    Are you sure?
                    <br />
                    Continuing will clear the attendance of all students for
                    this class.
                  </p>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="mr-2 bg-gray-200 text-black hover:bg-gray-300">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(currentClass?.id)}
                    className="bg-red-500 text-white hover:bg-red-600"
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

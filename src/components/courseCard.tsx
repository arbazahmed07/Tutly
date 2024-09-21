"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoMdBookmarks } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";
import { Suspense, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaUsersGear } from "react-icons/fa6";
import Loader from "./Loader";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function CourseCard({ course, currentUser }: any) {
  const router = useRouter();
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [courseTitle, setCourseTitle] = useState<string>(course.title);
  const [img, setImg] = useState<string>(course.image);
  const [isPublished, setIsPublished] = useState<boolean>(course.isPublished);
  const [text, setText] = useState<string>("Modify");

  const handleEditCourse = async (id: string) => {
    try {
      const res = await axios.put(`/api/course/edit`, {
        id: id,
        title: courseTitle,
        isPublished: isPublished,
        image: img,
      });

      if (
        res.data.error ||
        res.data.error === "Failed to add new Class" ||
        res.data === null
      ) {
        toast.error("Failed to edit course");
      } else {
        toast.success("Course edited successfully");
        setOpenPopup(false); // Close the dialog
        setText("Edit");
        setCourseTitle(res.data.title);
        setImg(res.data.image);
        setIsPublished(res.data.isPublished);
      }
      router.refresh();
    } catch (e) {
      toast.error("Failed to edit course");
      setText("Edit");
      setCourseTitle(course.title);
      setImg(course.image);
      setIsPublished(course.isPublished);
      setOpenPopup(!openPopup);
      router.refresh();
    }
  };
  const expired = () => {
    if (!course.endDate) return false;
    const endDate = new Date(course.endDate);
    const currentDate = new Date();
    return currentDate > endDate;
  };

  return (
    <div
      key={course.id}
      className="m-auto mt-3 w-[280px] rounded-lg border md:mx-2 shadow-lg"
    >
      <div
        className="relative h-[150px] cursor-pointer rounded-t-lg bg-white text-secondary-700"
        onClick={
          expired()
            ? () => router.push(`/courses`)
            : () => router.push(`/courses/${course.id}`)
        }
      >
        <div className="relative h-full w-full">
          {course && (
            <Image
              unoptimized
              src={
                course.image ||
                "https://i.postimg.cc/CMGSNVsg/new-course-colorful-label-sign-template-new-course-symbol-web-banner-vector.jpg"
              }
              alt="course image"
              layout="fill"
              className="rounded-t-lg"
              objectFit="cover"
            />
          )}
          <div>
            {course.isPublished === false &&
              currentUser?.role === "INSTRUCTOR" && (
                <div className="absolute right-0 top-0 m-3 flex items-center rounded-md border bg-red-500 p-1 text-xs text-secondary-50">
                  <h1 className="text-xs font-medium">Draft</h1>
                </div>
              )}
          </div>
        </div>
        <div className="absolute bottom-0 right-0 m-3 flex items-center rounded-md border bg-blue-500 p-1 text-xs text-secondary-50">
          <IoMdBookmarks className="mr-1" />
          <h1 className="text-xs font-medium">
            {course._count.classes} Classes
          </h1>
        </div>
      </div>
      <div className="flex h-[50px] items-center justify-between border-t px-2">
        {expired() ? (
          <div className="cursor-pointer">
            <h1 className="text-sm">{course?.title} [ Course Expired ]</h1>
          </div>
        ) : (
          <div
            onClick={() => router.push(`/courses/${course.id}`)}
            className="cursor-pointer"
          >
            <h1 className="text-sm">{course?.title}</h1>
          </div>
        )}
        {currentUser.role === "INSTRUCTOR" && (
          <div className="flex items-center justify-between gap-3">
            <Suspense fallback={<Loader />}>
              <button
                title="btn"
                onClick={() =>
                  router.push(`/instructor/course/${course.id}/manage`)
                }
              >
                <FaUsersGear className="h-5 w-5 cursor-pointer opacity-90 hover:opacity-100" />
              </button>
            </Suspense>
            <Suspense fallback={<Loader />}>
              <Dialog open={openPopup} onOpenChange={setOpenPopup}>
                <DialogTrigger asChild>
                  <button title="btn" onClick={() => setOpenPopup(true)}>
                    <MdOutlineEdit className="h-5 w-5 cursor-pointer opacity-90 hover:opacity-100" />
                  </button>
                </DialogTrigger>
                <div className="flex items-center justify-center">
                  <DialogContent className="fixed z-50 bg-zinc-400 text-black dark:text-white">
                    <div>
                      <div className="mb-4">
                        <h1 className="my-4 text-center text-lg font-semibold">
                          EDIT COURSE
                        </h1>
                        <input
                          onChange={(e) => setCourseTitle(e.target.value)}
                          value={courseTitle}
                          type="text"
                          className="m-auto mb-4 block w-full rounded bg-background p-2 outline-none"
                          placeholder="Title"
                        />
                      </div>
                      <label htmlFor="publish">Publish:</label>
                      <div className="mb-4 flex items-center space-x-5">
                        <div className="flex items-center justify-start">
                          <input
                            type="radio"
                            id="yes"
                            name="publish"
                            value="true"
                            checked={isPublished === true}
                            className="mr-1 h-4 w-4"
                            onChange={(e) =>
                              setIsPublished(e.target.value === "true")
                            }
                          />
                          <label htmlFor="yes">Yes</label>
                        </div>
                        <div className="flex items-center justify-start">
                          <input
                            type="radio"
                            id="no"
                            name="publish"
                            value="false"
                            checked={isPublished === false}
                            className="mr-1 h-4 w-4"
                            onChange={(e) =>
                              setIsPublished(e.target.value === "false")
                            }
                          />
                          <label htmlFor="no">No</label>
                        </div>
                      </div>
                      <input
                        onChange={(e) => setImg(e.target.value)}
                        value={img ? img : ""}
                        type="text"
                        className="m-auto my-3 block w-full rounded bg-background p-2 outline-none"
                        placeholder="Paste image link here"
                      />
                      <button
                        disabled={text === "Modifying..."}
                        onClick={() => {
                          handleEditCourse(course.id);
                          setText("Modifying...");
                        }}
                        className="my-3 flex w-full items-center justify-center rounded-md bg-primary-500 p-2 text-white hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-secondary-800"
                      >
                        {text}
                      </button>
                    </div>
                  </DialogContent>
                </div>
              </Dialog>
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}

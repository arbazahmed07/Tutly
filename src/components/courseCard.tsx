'use client'
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
        image: img
      })


      if (res.data.error || res.data.error === "Failed to add new Class" || res.data === null) {
        toast.error("Failed to edit course");
      }
      else {
        toast.success("Course edited successfully");
        setOpenPopup(!openPopup);
        setText("Edit");
        setCourseTitle(res.data.title);
        setImg(res.data.image);
        setIsPublished(res.data.isPublished);
      }
      router.refresh()
    } catch (e) {
      toast.error("Failed to edit course");
      setText("Edit");
      setCourseTitle(course.title);
      setImg(course.image);
      setIsPublished(course.isPublished);
      setOpenPopup(!openPopup);
      router.refresh()
    }
  }
  const expired = () => {
    if (!course.endDate) return false;
    const endDate = new Date(course.endDate);
    const currentDate = new Date();
    return currentDate > endDate;
  };

  return (
    <div key={course.id} className="rounded-lg border m-auto mt-3 w-[280px] md:mx-2" style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
      <div className="h-[150px]  relative text-secondary-700 bg-white rounded-t-lg cursor-pointer" onClick={expired() ? () => router.push(`/courses`) : () => router.push(`/courses/${course.id}`)}>
        <div className="h-full w-full relative">
          {course && (
            <Image
              src={course.image || "https://i.postimg.cc/CMGSNVsg/new-course-colorful-label-sign-template-new-course-symbol-web-banner-vector.jpg"}
              alt="course image"
              layout="fill"
              className="rounded-t-lg"
              objectFit="cover"
            />
          )}
          <div>
            {
              course.isPublished === false && currentUser?.role === 'INSTRUCTOR' && (
                <div className="absolute top-0 right-0 m-3 text-xs flex border  items-center text-secondary-50 bg-red-500 p-1 rounded-md">
                  <h1 className="text-xs font-medium">Draft</h1>
                </div>
              )
            }
          </div>
        </div>
        <div className="absolute bottom-0 right-0 m-3 text-xs flex items-center text-secondary-50 border  bg-blue-500 p-1 rounded-md">
          <IoMdBookmarks className="mr-1" />
          <h1 className="text-xs font-medium">{course._count.classes} Classes</h1>
        </div>
      </div>
      <div className="h-[50px] border-t flex justify-between px-2 items-center">
        {
          expired() ?
            <div className=" cursor-pointer" >
              <h1 className="text-sm">{course?.title} [ Course Expired ]</h1>
            </div> :
            <div onClick={() => router.push(`/courses/${course.id}`)} className=" cursor-pointer" >
              <h1 className="text-sm">{course?.title}</h1>
            </div>
        }
        {
          currentUser.role === 'INSTRUCTOR' &&
          <div className=" flex items-center justify-between gap-3">
            <Suspense fallback={<Loader />}>
              <button onClick={() => router.push(`/instructor/course/${course.id}/manage`)}>
                <FaUsersGear className=" w-5 h-5 cursor-pointer  hover:opacity-100 opacity-90" />
              </button>
            </Suspense>
            <Suspense fallback={<Loader />}>
              <button onClick={() => setOpenPopup(true)}>
                <MdOutlineEdit className=" w-5 h-5 cursor-pointer  hover:opacity-100 opacity-90" />
              </button>
            </Suspense>
          </div>
        }

      </div>
      {
        openPopup
        && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
            <div className="relative min-w-[300px] sm:min-w-[400px] dark:text-white max-w-[80%] bg-zinc-400 text-black p-4 rounded-lg">
              <div
                onClick={() => setOpenPopup(!openPopup)}
                className="absolute top-2 right-2 cursor-pointer"
              >
                <RxCross2 className="h-7 w-7" />
              </div>
              <div className="mb-4">
                <h1 className="text-lg font-semibold text-center my-4">ADD NEW COURSE</h1>
                <input
                  onChange={(e) => setCourseTitle(e.target.value)}
                  value={courseTitle}
                  type="text"
                  className="rounded p-2 outline-none block m-auto w-full mb-4 bg-background"
                  placeholder="Title"
                />
              </div>
              <label htmlFor="publish">Publish:</label>
              <div className="space-x-5 flex items-center">
                <div className="flex justify-start items-center">
                  <input
                    type="radio"
                    id="yes"
                    name="publish"
                    value="true"
                    checked={isPublished === true}
                    className="w-4 h-4 mr-1"
                    onChange={(e) => setIsPublished(e.target.value === 'true')}
                  />
                  <label htmlFor="yes">Yes</label>
                </div>
                <div className="flex justify-start items-center">
                  <input
                    type="radio"
                    id="no"
                    name="publish"
                    value="false"
                    checked={isPublished === false}
                    className="w-4 h-4 mr-1"
                    onChange={(e) => setIsPublished(e.target.value === 'true')}
                  />
                  <label htmlFor="no">No</label>
                </div>
              </div>
              {isPublished}
              <input
                onChange={(e) => setImg(e.target.value)}
                value={img ? img : ''}
                type="text"
                className="rounded p-2 my-3 outline-none block m-auto w-full bg-background"
                placeholder="Paste image link here"
              />
              <button
                disabled={text === "Modify..."}
                onClick={() => { handleEditCourse(course.id); setText("Modifying...") }}
                className="rounded-md flex justify-center items-center disabled:bg-secondary-800 disabled:cursor-not-allowed bg-primary-500 hover:bg-primary-600 p-2 my-3 w-full text-white"
              >
                {text}
              </button>
            </div>
          </div>
        )}
    </div>
  )
}

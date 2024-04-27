"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, {  useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

function AddCourse() {
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [text, setText] = useState<string>("Create");
  const router = useRouter()

  const handleSubmit = async () => {

    try
    {
        const res = await axios.post("/api/course/create",{
          title:courseTitle,
          isPublished:isPublished,
            image : img
          })
            setOpenPopup(!openPopup);

      if (res.data.error || res.data.error === "Failed to add new Class" || res.data === null) {
          toast.error("Failed to add newClass");
        } else {
          toast.success("new Class added successfully");
          setText("Create");
          setCourseTitle("");
          setImg("");
          setIsPublished(false);
          router.refresh()
          setOpenPopup(!openPopup);
      }
      }catch(e)
      {
        toast.error("Failed to add newClass");
        setText("Create");
        setCourseTitle("");
        setImg("");
        setIsPublished(false);
        router.refresh()
        setOpenPopup(!openPopup);
        
      };
  };
        
      return (
        <>
          <div
            onClick={() => setOpenPopup(!openPopup)}
            className="rounded-lg border cursor-pointer m-3 flex flex-col items-center justify-center w-[280px]  h-[200px]"
            style={{
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
          > 
            <div className="text-center hover:opacity-85 cursor-pointer  ">
              <FaPlus className="text-6xl" />
              <h1 className="text-2xl mt-3">Add</h1>
            </div>
          </div>
          {openPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
              <div className="relative min-w-[400px] max-w-[80%] bg-zinc-400   p-4 rounded-lg">
                <div
                  onClick={() => setOpenPopup(!openPopup)}
                  className="absolute top-2 right-2 cursor-pointer text-white"
                >
                  <RxCross2 className="h-7 w-7"/>
                </div>
                <div className="mb-4">
                  <h1 className="text-lg font-semibold text-center my-4 text-white">ADD NEW COURSE</h1>
                  <input
                    onChange={(e) => setCourseTitle(e.target.value)}
                    type="text"
                    className="rounded p-2 outline-none block m-auto w-full mb-4 text-white"
                    placeholder="Title"
                  />
                </div>
                <label className="text-white" htmlFor="publish">Publish:</label>
                <div className="space-x-5 flex items-center text-white">
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
                  type="text" 
                  className="rounded p-2 my-3 outline-none block m-auto w-full text-white"
                  placeholder="Paste image link here"
                />
                <button
                  disabled={text === "Creating..."}
                  onClick={() => {handleSubmit(); setText("Creating...")}}
                  className="rounded-md flex justify-center items-center disabled:bg-secondary-800 disabled:cursor-not-allowed bg-primary-500 hover:bg-primary-600 p-2  my-3 w-full"
                >
                  {text}
                  &nbsp;
                  {text === "Creating..." ? (
                    <div className="animate-spin">
                      <FaPlus />
                    </div>
                  ) : (
                    <FaPlus />
                  )}
                </button>
              </div>
            </div>
          )}

        </>
      );
}

export default AddCourse;

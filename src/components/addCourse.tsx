"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, {  useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";

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
            className="rounded-lg border cursor-pointer hover:opacity-85 m-3 flex flex-col items-center justify-center w-[280px] h-[200px]"
          > 
            <div className="text-center cursor-pointer  ">
              <FaPlus className="text-5xl" />
              <h1 className="text-xl mt-3">Add</h1>
            </div>
          </div>
          {openPopup && (
            <div className="absolute top-[150px] left-[40%] min-w-[400px] space-y-5 bg-black p-4 rounded-lg">
              <div
                onClick={() => setOpenPopup(!openPopup)}
                className="absolute right-2 top-2 cursor-pointer text-md"
              >
                <IoMdCloseCircle className="h-7 w-7"/>
              </div>
              <div className="mb-4">
                <h1 className="text-md text-center my-4">ADD NEW COURSE</h1>
                <input
                  onChange={(e) => setCourseTitle(e.target.value)}
                  type="text"
                  className="rounded p-2 bg-background block m-auto w-full mb-4"
                  placeholder="Title"
                  />
              </div>
              <label className="" htmlFor="publish">Publish:</label>
                  <div className=" space-x-5 flex items-center">
                    <div className=" flex justify-start items-center">
                      <input
                        type="radio"
                        id="yes"
                        name="publish"
                        value="true"
                        checked={isPublished === true}
                        className=" w-4 h-4 mr-1"
                        onChange={(e) => setIsPublished(e.target.value === 'true')}
                        />
                      <label htmlFor="yes">Yes</label>
                    </div>
                    <div className=" flex justify-start items-center">
                      <input
                        type="radio"
                        id="no"
                        name="publish"
                        value="false"
                        checked={isPublished === false}
                        className=" w-4 h-4 mr-1"
                        onChange={(e) => setIsPublished(e.target.value === 'true')}
                        />
                      <label htmlFor="no" className=" text-lg">No</label>
                    </div>
                  </div>
                  {isPublished}
              <input
                onChange={(e) => setImg(e.target.value)}
                type="text"
                className="rounded p-2 bg-background block m-auto w-full"
                placeholder="Paste image link here"
              />
              <button
                disabled={text === "Creating..."}
                onClick={()=>{handleSubmit();setText("Creating...") }}
                className="rounded-md flex justify-center items-center disabled:bg-secondary-800 disabled:cursor-not-allowed bg-primary-500 hover:bg-primary-600 p-2  my-3 w-full"
              >
                {text}
                &nbsp;
                {
                  text === "Creating..." ? (
                    <div className="animate-spin">
                      <FaPlus />
                    </div>
                  ):(
                    <FaPlus />
                  )
                }
              </button>
            </div>
          )}
        </>
      );
}

export default AddCourse;

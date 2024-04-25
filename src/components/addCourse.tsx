"use client";
import { createCourse } from "@/actions/courses";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";

function AddCourse() {
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [courseTitle, setCourseTitle] = useState<string>("");
    const handleSubmit = async () => {
    const newCourse = await axios.post("/api/course/create",{
    title:courseTitle,
    isPublished:true,
    })
      setOpenPopup(!openPopup);
    };
  return (
    <>
      <div
        onClick={() => setOpenPopup(!openPopup)}
        className="rounded-lg border cursor-pointer m-5 flex flex-col items-center justify-center"
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="text-center">
          <IoIosAddCircleOutline className="text-6xl" />
          <h1>Add</h1>
        </div>
      </div>
      {openPopup && (
        <div className="absolute top-[200px] left-[45%] min-w-[300px] bg-secondary-500 p-4 rounded-lg">
          <div
            onClick={() => setOpenPopup(!openPopup)}
            className="absolute right-2 top-2 cursor-pointer text-md"
          >
            <IoMdCloseCircle />
          </div>
          <h1 className="text-md text-center my-4">ADD NEW COURSE</h1>
          <input
            onChange={(e) => setCourseTitle(e.target.value)}
            type="text"
            className="rounded p-2 bg-background block m-auto w-full"
            placeholder="Title"
          />
          <button
            onClick={handleSubmit}
            className="rounded bg-primary-500 p-2 block m-auto my-3 w-full"
          >
            Create
          </button>
        </div>
      )}
    </>
  );
}

export default AddCourse;

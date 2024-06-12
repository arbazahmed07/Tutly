"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import type { PutBlobResult } from "@vercel/blob";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

function AddCourse() {
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [text, setText] = useState<string>("Create");
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const handleSubmit = async () => {
    try {
      if(img === ''){
        toast.error("Please upload an image");
        return;
      }


      
      const res = await axios.post("/api/course/create", {
        title: courseTitle,
        isPublished: isPublished,
        image: img,
      });
      setOpenPopup(!openPopup);

      
      if (
        res.data.error ||
        res.data.error === "Failed to add new Class" ||
        res.data === null
      ) {
        toast.error("Failed to add newClass");
      } else {
        toast.success("new Class added successfully");
        setText("Create");
        setCourseTitle("");
        setImg("");
        setIsPublished(false);
        router.refresh();
        setOpenPopup(!openPopup);
      }
    } catch (e) {
      toast.error("Failed to add newClass");
      setText("Create");
      setCourseTitle("");
      setImg("");
      setIsPublished(false);
      router.refresh();
      setOpenPopup(!openPopup);
    }
  };

  const handleImageUpload = async (e: any) => {
    e.preventDefault();
    
    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(`/api/image-upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;
    setBlob(newBlob);
    setImg(newBlob.url);
  };

  return (
    <>
      <div
        onClick={() => setOpenPopup(!openPopup)}
        className="rounded-lg border cursor-pointer flex flex-col items-center justify-center m-auto md:mx-2 my-3 w-[280px] h-[200px] shadow-lg"
      >
        <div className="text-center cursor-pointer  ">
          <FaPlus className="text-5xl" />
          <h1 className="text-xl mt-3">Add</h1>
        </div>
      </div>
      {openPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
          <div className="relative min-w-[300px] sm:min-w-[400px] max-w-[80%] bg-zinc-400  p-4 rounded-lg">
            <div
              onClick={() => setOpenPopup(!openPopup)}
              className="absolute top-2 right-2 cursor-pointer"
            >
              <RxCross2 className="h-7 w-7" />
            </div>
            <div className="mb-4">
              <h1 className="text-lg font-semibold text-center my-4">
                ADD NEW COURSE
              </h1>
              <input
                onChange={(e) => setCourseTitle(e.target.value)}
                type="text"
                className="rounded p-2 outline-none block m-auto w-full mb-4"
                placeholder="Title"
              />
            </div>
            <label className="" htmlFor="publish">
              Publish:
            </label>
            <div className="space-x-5 flex items-center">
              <div className="flex justify-start items-center">
                <input
                  type="radio"
                  id="yes"
                  name="publish"
                  value="true"
                  checked={isPublished === true}
                  className="w-4 h-4 mr-1"
                  onChange={(e) => setIsPublished(e.target.value === "true")}
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
                  onChange={(e) => setIsPublished(e.target.value === "true")}
                />
                <label htmlFor="no">No</label>
              </div>
            </div>
            {isPublished}
            {blob ? (
              <input
                disabled
                type="text"
                value={blob.url}
                className="rounded p-2 my-3 outline-none block m-auto w-full"
                placeholder="Paste image link here"
              />
            ) : (
              <form
                onSubmit={handleImageUpload}
                className=" my-5  flex items-center justify-center gap-4"
              >
                <div>
                  <input
                    className=" rounded-sm bg-primary-800 hover:bg-primary-700 text-white "
                    name="file"
                    ref={inputFileRef}
                    type="file"
                    required
                    accept=".jpeg , .png, .jpg"
                  />
                </div>
                <button
                  type="submit"
                  className=" rounded-md bg-primary-800 hover:bg-primary-700 py-1 px-1.5 text-base"
                >
                  Upload
                </button>
              </form>
            )}
            <button
              disabled={text === "Creating..." || blob === null}
              onClick={() => {
                handleSubmit();
                setText("Creating...");
              }}
              className="rounded-md font-semibold flex justify-center items-center disabled:bg-secondary-800 disabled:cursor-not-allowed bg-primary-500 hover:bg-primary-600 p-2  my-3 w-full"
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

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
      // if(img === ''){
      //   toast.error("Please upload an image");
      //   return;
      // }

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

  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
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
        className="m-auto my-3 flex h-[200px] w-[280px] cursor-pointer flex-col items-center justify-center rounded-lg border shadow-lg md:mx-2"
      >
        <div className="cursor-pointer text-center">
          <FaPlus className="text-5xl" />
          <h1 className="mt-3 text-xl">Add</h1>
        </div>
      </div>
      {openPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="relative min-w-[300px] max-w-[80%] rounded-lg bg-zinc-400 p-4 sm:min-w-[400px]">
            <div
              onClick={() => setOpenPopup(!openPopup)}
              className="absolute right-2 top-2 cursor-pointer"
            >
              <RxCross2 className="h-7 w-7" />
            </div>
            <div className="mb-4">
              <h1 className="my-4 text-center text-lg font-semibold">
                ADD NEW COURSE
              </h1>
              <input
                onChange={(e) => setCourseTitle(e.target.value)}
                type="text"
                className="m-auto mb-4 block w-full rounded p-2 outline-none"
                placeholder="Title"
              />
            </div>
            <label className="" htmlFor="publish">
              Publish:
            </label>
            <div className="flex items-center space-x-5">
              <div className="flex items-center justify-start">
                <input
                  type="radio"
                  id="yes"
                  name="publish"
                  value="true"
                  checked={isPublished === true}
                  className="mr-1 h-4 w-4"
                  onChange={(e) => setIsPublished(e.target.value === "true")}
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
                className="m-auto my-3 block w-full rounded p-2 outline-none"
                placeholder="Paste image link here"
              />
            ) : (
              <form
                onSubmit={handleImageUpload}
                className="my-5 flex items-center justify-center gap-4"
              >
                <div>
                  <input
                    className="rounded-sm bg-primary-800 text-white hover:bg-primary-700"
                    name="file"
                    ref={inputFileRef}
                    type="file"
                    required
                    accept=".jpeg , .png, .jpg"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-md bg-primary-800 px-1.5 py-1 text-base hover:bg-primary-700"
                >
                  Upload
                </button>
              </form>
            )}
            <button
              disabled={text === "Creating..." || courseTitle === ""}
              onClick={() => {
                handleSubmit();
                setText("Creating...");
              }}
              className="my-3 flex w-full items-center justify-center rounded-md bg-primary-500 p-2 font-semibold hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-secondary-800"
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

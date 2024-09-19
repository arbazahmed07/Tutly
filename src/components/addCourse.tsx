"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import type { PutBlobResult } from "@vercel/blob";
import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
        toast.error("Failed to add new Class");
      } else {
        toast.success("New class added successfully");
        setText("Create");
        setCourseTitle("");
        setImg("");
        setIsPublished(false);
        router.refresh();
        setOpenPopup(!openPopup);
      }
    } catch (e) {
      toast.error("Failed to add new Class");
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
      <Dialog open={openPopup} onOpenChange={setOpenPopup}>
        <DialogTrigger asChild>
          <div
            className="rounded-lg border cursor-pointer flex flex-col items-center justify-center m-auto md:mx-2 my-3 w-[280px] h-[200px] shadow-lg bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white"
          >
            <div className="text-center cursor-pointer">
              <FaPlus className="text-5xl" />
              <h1 className="text-xl mt-3">Add</h1>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="p-4 box-border dark:text-white bg-zinc-400 text-black rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>
              <div className="text-lg font-semibold text-center">
                ADD NEW COURSE
              </div>
            </DialogTitle>
          </DialogHeader>
          <div>
            <input
              onChange={(e) => setCourseTitle(e.target.value)}
              type="text"
              className="rounded p-2 outline-none w-full border border-gray-300"
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
                onChange={(e) => setIsPublished(e.target.value === "false")}
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
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
              className="my-3 flex items-center justify-center gap-4 "
            >
              <div>
                <input
                  title="file"
                  className="rounded-sm dark:text-white p-1"
                  name="file"
                  ref={inputFileRef}
                  type="file"
                  required
                  accept=".jpeg,.png,.jpg"
                />
              </div>
              <button
                type="submit"
                className="rounded-md bg-blue-500 py-1 px-1.5 text-base text-white"
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
            className="rounded-md font-semibold flex justify-center items-center disabled:bg-blue-500 disabled:cursor-not-allowed p-2 my-3 w-full text-white"
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
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddCourse;

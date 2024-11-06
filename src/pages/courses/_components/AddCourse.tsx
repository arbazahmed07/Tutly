"use client";
import axios from "axios";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "@/hooks/use-router";

function AddCourse() {
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [text, setText] = useState<string>("Create");
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);

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
        setOpenPopup(!openPopup);
      }
    } catch (e) {
      toast.error("Failed to add new Class");
      setText("Create");
      setCourseTitle("");
      setImg("");
      setIsPublished(false);
      setOpenPopup(!openPopup);
    }
  };

  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];
  };

  return (
    <>
      <Dialog open={openPopup} onOpenChange={setOpenPopup}>
        <DialogTrigger asChild>
          <div className="m-auto my-3 flex h-[200px] w-[280px] cursor-pointer flex-col items-center justify-center rounded-lg border bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white shadow-lg md:mx-2">
            <div className="cursor-pointer text-center">
              <FaPlus className="text-5xl" />
              <h1 className="mt-3 text-xl">Add</h1>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="box-border rounded-lg bg-zinc-400 p-4 text-black shadow-lg dark:text-white">
          <DialogHeader>
            <DialogTitle>
              <div className="text-center text-lg font-semibold">
                ADD NEW COURSE
              </div>
            </DialogTitle>
          </DialogHeader>
          <div>
            <input
              onChange={(e) => setCourseTitle(e.target.value)}
              type="text"
              className="w-full rounded border border-gray-300 p-2 outline-none"
              placeholder="Title"
            />
          </div>
          <label htmlFor="publish">Publish:</label>
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
                onChange={(e) => setIsPublished(e.target.value === "false")}
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
          {/* {blob ? (
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
              className="my-3 flex items-center justify-center gap-4"
            >
              <div>
                <input
                  title="file"
                  className="rounded-sm p-1 dark:text-white"
                  name="file"
                  ref={inputFileRef}
                  type="file"
                  required
                  accept=".jpeg,.png,.jpg"
                />
              </div>
              <button
                type="submit"
                className="rounded-md bg-blue-500 px-1.5 py-1 text-base text-white"
              >
                Upload
              </button>
            </form>
          )} */}
          <button
            disabled={text === "Creating..." || courseTitle === ""}
            onClick={() => {
              handleSubmit();
              setText("Creating...");
            }}
            className="my-3 flex w-full items-center justify-center rounded-md p-2 font-semibold text-white disabled:cursor-not-allowed disabled:bg-blue-500"
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

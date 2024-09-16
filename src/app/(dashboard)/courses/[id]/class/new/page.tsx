"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const NewClass = () => {
  const [videoLink, setVideoLink] = useState("");
  const [videoType, setVideoType] = useState("");
  const [classTitle, setClassTitle] = useState("");
  const [textValue, setTextValue] = useState("Create Class");
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await axios.get(`/api/course/${params.id}/folders`);
        setFolders(res.data);
      } catch (error) {
        console.error("Error fetching folders:", error);
        toast.error("Failed to fetch folders");
      }
    };

    fetchFolders();
  }, [params.id]);

  const handleCreateClass = async () => {
    if (!videoLink.trim() || !classTitle.trim() || !videoType) {
      return toast.error("Please fill all fields");
    }

    if (/\s/.test(classTitle)) {
      return toast.error(
        "Class title cannot contain spaces ( use hyphen '-' instead) ",
      );
    }

    setTextValue("Creating Class");
    try {
      const res = await axios.post("/api/classes/create", {
        classTitle,
        videoLink,
        videoType,
        createdAt,
        folderId: selectedFolder != "new" ? selectedFolder : undefined,
        courseId: params.id,
        folderName: selectedFolder == "new" ? folderName.trim() : undefined,
      });

      if (res.data.error) {
        toast.error("Failed to add new class");
      } else {
        toast.success("Class added successfully");
        setVideoLink("");
        setClassTitle("");
        setSelectedFolder("");
        setFolderName("");
        router.push(`/courses/${params.id}/class/${res.data.id}`);
      }
    } catch (error) {
      console.error("Error creating class:", error);
      toast.error("Failed to add new class");
    } finally {
      setTextValue("Create Class");
      router.refresh();
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="m-5 md:mt-20">
      <div className="flex flex-col items-center">
        <select
          value={videoType}
          onChange={(e) => setVideoType(e.target.value)}
          className="mb-4 w-full rounded border border-secondary-300 px-4 py-2 sm:w-96"
        >
          <option value="">Select Video Type</option>
          <option value="DRIVE">Drive</option>
          <option value="YOUTUBE">YouTube</option>
          <option value="ZOOM">Zoom</option>
        </select>
        <input
          type="text"
          placeholder="Enter video link"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          className="mb-4 w-full rounded border border-secondary-300 px-4 py-2 sm:w-96"
        />
        <input
          type="text"
          placeholder="Enter class title"
          value={classTitle}
          onChange={(e) => setClassTitle(e.target.value)}
          className="w-full rounded border border-secondary-300 px-4 py-2 sm:w-96"
        />
        {classTitle == "" || /\s/.test(classTitle) ? (
          <p className="mb-4 mt-1 text-sm">
            *Class name should not contain spaces. Use hyphen(-) instead.
          </p>
        ) : (
          <div className="mb-4"></div>
        )}
        <input
          type="date"
          placeholder="Enter class date"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
          className="mb-4 w-full rounded border border-secondary-300 px-4 py-2 sm:w-96"
        />

        <select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
          className="mb-4 w-full rounded border border-secondary-300 px-4 py-2 sm:w-96"
        >
          <option value="">Select Folder (Optional)</option>
          <option value="new">New Folder</option>
          {folders.map((folder: any) => (
            <option key={folder.id} value={folder.id}>
              {folder.title}
            </option>
          ))}
        </select>
        {selectedFolder === "new" && (
          <input
            type="text"
            placeholder="Enter new folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="mb-4 w-full rounded border border-secondary-300 px-4 py-2 sm:w-96"
          />
        )}
        <Button
          disabled={
            !videoLink ||
            !classTitle ||
            !videoType ||
            textValue === "Creating Class"
          }
          className="z-0 flex items-center justify-between bg-secondary-700 text-white hover:bg-secondary-800"
          onClick={handleCreateClass}
        >
          {textValue}
          &nbsp;&nbsp;
          {textValue === "Creating Class" ? (
            <div className="animate-spin">
              <FaPlus />
            </div>
          ) : (
            <FaPlus />
          )}
        </Button>
      </div>
    </div>
  );
};

export default NewClass;

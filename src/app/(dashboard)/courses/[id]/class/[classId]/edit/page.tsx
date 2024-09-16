"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const EditClass = () => {
  const [videoLink, setVideoLink] = useState("");
  const [videoType, setVideoType] = useState("");
  const [classTitle, setClassTitle] = useState("");
  const [textValue, setTextValue] = useState("Modify Class");
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const [loading, setLoading] = useState(true);

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
    handleGetDetails();
  }, [params.classId]);

  const handleGetDetails = async () => {
    try {
      const res = await axios.get(
        `/api/classes/getClassById/${params.classId}`,
        {
          params: {
            courseId: params.id,
          },
        },
      );
      setVideoLink(res.data?.video.videoLink);
      setVideoType(res.data?.video.videoType);
      setClassTitle(res.data?.title);
      setFolderName(res.data?.Folder?.title);
      setSelectedFolder(res.data?.Folder.id);
      setCreatedAt(res.data?.createdAt?.toString());

      setLoading(false);
      setShowForm(true);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleEditClass = async () => {
    if (!videoLink.trim() || !classTitle.trim() || !videoType) {
      return toast.error("Please fill all fields");
    }

    setTextValue("Modifying Class...");
    setLoading(true);
    try {
      const res = await axios.put("/api/classes/editClass", {
        classId: params.classId,
        courseId: params.id,
        classTitle,
        videoLink,
        videoType,
        createdAt: new Date(createdAt || ""),
        folderId: selectedFolder != "new" ? selectedFolder : undefined,
        folderName: selectedFolder == "new" ? folderName.trim() : undefined,
      });

      if (res.data.error) {
        toast.error(res.data.error.message());
      } else {
        toast.success("Class modified successfully");
        setTextValue("Class Modified");
        setVideoLink("");
        setClassTitle("");
        setSelectedFolder("");
        setCreatedAt("");
        router.push(`/courses/${params.id}/class/${res.data.id}`);
      }
    } catch (error) {
      toast.error("Failed to modify class");
    } finally {
      setTextValue(" Modify Class");
      router.refresh();
    }
  };

  return (
    <div className="mt-8">
      {showForm ? (
        <div className="flex flex-col items-center">
          <select
            value={videoType}
            disabled={loading}
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
            disabled={loading}
            placeholder="Enter video link"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="mb-4 w-full rounded border border-secondary-300 px-4 py-2 sm:w-96"
          />
          <input
            type="text"
            disabled
            placeholder="Enter class title"
            value={classTitle}
            onChange={(e) => setClassTitle(e.target.value)}
            className="mb-4 w-full cursor-not-allowed select-none rounded border border-secondary-300 px-4 py-2 sm:w-96"
          />
          <input
            type="date"
            disabled={loading}
            placeholder="Enter class date"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            className="mb-4 w-full rounded border border-secondary-300 px-4 py-2 sm:w-96"
          />

          <select
            value={selectedFolder}
            disabled={loading}
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
              disabled={loading}
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
            className="flex items-center justify-between bg-secondary-700 text-white hover:bg-secondary-800"
            onClick={handleEditClass}
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
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default EditClass;

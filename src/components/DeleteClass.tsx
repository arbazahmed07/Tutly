"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const DeleteClass = ({
  classId,
  courseId,
}: {
  classId: string;
  courseId: string;
}) => {
  const router = useRouter();
  const [params, setParams] = useState({ classId, courseId });
  const [clicked, setClicked] = useState(false);

  const handleDeleteClass = async () => {
    setClicked(true);
    try {
      await axios.delete(`/api/classes/deleteClass/${params.classId}`, {
        params: {
          courseId: params.courseId,
        },
      });
      toast.success("Class deleted successfully");
      router.push(`/courses/${params.courseId}`);
      router.refresh();
    } catch (error) {
      // console.error('Error deleting class:', error);
      setClicked(false);
      toast.error("Failed to delete class");
    } finally {
      setClicked(false);
      router.refresh();
    }
  };

  return (
    <button disabled={clicked} title="Delete" onClick={handleDeleteClass}>
      <MdDelete
        className={`h-5 w-5 ${clicked ? "cursor-not-allowed text-gray-600" : "cursor-pointer text-red-500"} `}
      />
    </button>
  );
};

export default DeleteClass;

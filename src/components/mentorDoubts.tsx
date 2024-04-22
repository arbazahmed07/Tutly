"use client";
import axios from "axios";
import { Fullscreen } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ImReply } from "react-icons/im";

function MentorDoubts({ courses, doubts: userDoubts }: any) {
  const [isMounted, setIsMounted] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(courses[0].id);
  const [doubts, setDoubts] = useState<string[]>([]);
  const [doubt, setDoubt] = useState<string>("");
  const [reply, setReply] = useState<string>("");
  const [replyId, setReplyId] = useState<string>("");
  useEffect(() => {
    setIsMounted(true);
    setDoubts(userDoubts);
  }, []);
  if (!isMounted) {
    return;
  }

  const handleAddDoubt = async () => {
    if (!doubt) return;
    const res = await axios.post("/api/doubts/postDoubt", {
      title: undefined,
      description: doubt,
    });
    if (res.data.error) {
      toast.error("Failed to add doubt");
    } else {
      toast.success("Doubt added successfully");
      setDoubt("");
      setDoubts([...doubts, res.data]);
    }
  };

  const handleReply = async (id: string) => {
    if (!reply) return;

    const res = await axios.post("/api/doubts/reply", {
      doubtId: id,
      description: reply,
    });
    if (res.data.error) {
      toast.error("Failed to add reply");
    } else {
      toast.success("Reply added successfully");
      setReply("");
      setReplyId("");
      setDoubts(
        doubts.map((d: any) =>
          d.id === id ? { ...d, response: [...d.response, res.data] } : d
        )
      );
    }
  };

  const handleDeleteDoubt = async (id: string) => {
    alert("Are you sure you want to delete this doubt?");
    const res = await axios.delete(`/api/doubts/deleteDoubt/${id}`);
    if (res.data.error) {
      toast.error("Failed to delete doubt");
    } else {
      toast.success("Doubt deleted successfully");
      setDoubts(doubts.filter((d: any) => d.id !== id));
    }
  };

  const handleDeleteReply = async (replyId: string) => {
    alert("Are you sure you want to delete this reply?");
    const res = await axios.delete(`/api/doubts/reply/${replyId}`);
    if (res.data.error) {
      toast.error("Failed to delete reply");
    } else {
      toast.success("Reply deleted successfully");
      setDoubts(
        doubts.map((d: any) => ({
          ...d,
          response: d.response.filter((r: any) => r.id !== replyId),
        }))
      );
    }
  };

  const handleReplyEnterBtn = (e: any) => {
    if (e.key === "Enter") {
      handleReply(replyId);
    }
  };
  const handleDoubtEnterBtn = (e: any) => {
    if (e.key === "Enter") {
      handleAddDoubt();
    }
  };

  return (
    <div className="mx-10">
      <div className="flex gap-3">
        {courses?.map((course: any) => {
          return (
            <button
              onClick={() => setCurrentCourse(course.id)}
              className={`rounded p-2 w-20 sm:w-auto ${
                currentCourse === course.id && "border"
              }`}
              key={course.id}
            >
              <h1 className="truncate max-w-xs text-sm font-medium">
                {course.title}
              </h1>
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-2 my-4">
        {doubts.map((doubt: any) => {
          if (doubt.class.courseId === currentCourse) {
            return (
              <>
                <div
                  key={doubt.id}
                  className="border rounded p-2 px-4 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <div>
                        <Image
                          src={doubt.user.image}
                          width={30}
                          height={30}
                          alt="profile"
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <h1 className="text-xs">{doubt.user.name}</h1>
                        <h1 className="text-xs">@{doubt.user.username}</h1>
                      </div>
                    </div>
                    <div className="flex gap-14">
                      <div className="text-xs flex gap-4 items-center px-2 rounded-full border">
                        <h1>
                          {doubt.updatedAt.toLocaleString().split(", ")[0]}
                        </h1>
                        <h1>
                          {" "}
                          {doubt.updatedAt.toLocaleString().split(", ")[1]}
                        </h1>
                      </div>
                      <div className="cursor-pointer">
                        {replyId === doubt.id ? (
                          <div className="flex items-center mt-1">
                            <input
                              type="text"
                              placeholder="Enter your reply"
                              value={reply}
                              onKeyDown={handleReplyEnterBtn}
                              onChange={(e) => setReply(e.target.value)}
                              className="w-full sm:w-auto px-4 py-2 border outline-none border-secondary-300 rounded mr-2 mb-2 sm:mb-0"
                            />
                            <button
                              className="px-3 py-1 dark:bg-secondary-800 dark:hover:bg-secondary-700 bg-secondary-400 hover:bg-secondary-500  flex items-center justify-start text-white rounded text-sm"
                              onClick={() => handleReply(doubt.id)}
                            >
                              <ImReply />
                              &nbsp; Send
                            </button>
                          </div>
                        ) : (
                          <button
                            className="px-3 py-1 mt-1 text-sm flex items-center  dark:bg-secondary-800 dark:hover:bg-secondary-700 bg-secondary-400 hover:bg-secondary-500 text-white rounded"
                            onClick={() => setReplyId(doubt.id)}
                          >
                            <ImReply />
                            &nbsp; Reply
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>{doubt.description}</div>
                </div>
                <div className="ml-16 my-1">
                  {doubt.response.map((res: any) => {
                    return (
                      <div className="rounded border px-4 my-1 p-2 flex flex-col gap-2">
                        <h1 className="flex items-center text-sm"><ImReply />&nbsp; Reply</h1>
                        <div
                          key={res.id}
                          className="flex items-end justify-between"
                        >
                          <h1>{res.description}</h1>
                          <h1 className="text-xs">
                            {res.updatedAt.toLocaleString().split(", ")[0]}
                            &nbsp;
                            {res.updatedAt.toLocaleString().split(", ")[1]}
                          </h1>
                        </div>
                        </div>
                    );
                  })}
                </div>
              </>
            );
          }
        })}
      </div>
    </div>
  );
}

export default MentorDoubts;

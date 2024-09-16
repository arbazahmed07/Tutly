"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ImReply } from "react-icons/im";
import { TbLocationQuestion } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";

const UserDoubts = ({ userDoubts, classId }: any) => {
  const [doubts, setDoubts] = useState(userDoubts || []);
  const [doubt, setDoubt] = useState<string>("");
  const [reply, setReply] = useState<string>("");
  const [replyId, setReplyId] = useState<string>("");

  const handleAddDoubt = async () => {
    if (!doubt) return;
    const res = await axios.post("/api/doubts/postDoubt", {
      classId,
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
          d.id === id ? { ...d, response: [...d.response, res.data] } : d,
        ),
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
        })),
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
    <div className="mb-5 flex flex-col items-center justify-center">
      <h1 className="m-5 text-xl font-semibold">Ask your Doubts !!</h1>
      <div className="h-[70vh] w-full rounded-md bg-secondary-500 p-4 md:p-2">
        {doubts?.map((doubt: any, index: number) => (
          <div key={index} className="my-4 rounded-lg border p-3">
            <h2 className="text-xl font-semibold text-secondary-50">
              {doubt.title}
            </h2>
            <p className="text-secondary-100">{doubt.description}</p>
            {doubt.response.map((res: any, index: number) => (
              <div
                key={index}
                className="my-2 flex items-center justify-between overflow-auto text-wrap rounded-lg border p-1"
              >
                <div className="">
                  <p className="break-words text-secondary-50">
                    {res?.description}
                  </p>
                </div>
                <div>
                  <button
                    className="mx-2 rounded bg-secondary-400 p-1 text-lg text-white hover:bg-secondary-500 dark:bg-secondary-800 dark:hover:bg-secondary-700"
                    onClick={() => handleDeleteReply(res.id)}
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            ))}
            <button
              className="mb-3 mr-2 rounded bg-secondary-400 px-3 py-2 text-sm text-white hover:bg-secondary-500 dark:bg-secondary-800 dark:hover:bg-secondary-700"
              onClick={() => handleDeleteDoubt(doubt.id)}
            >
              Delete
            </button>
            {replyId === doubt.id ? (
              <div className="mt-1 flex items-center">
                <input
                  type="text"
                  placeholder="Enter your reply"
                  value={reply}
                  onKeyDown={handleReplyEnterBtn}
                  onChange={(e) => setReply(e.target.value)}
                  className="mb-2 mr-2 w-full rounded border border-secondary-300 px-4 py-2 outline-none sm:mb-0 sm:w-auto"
                />
                <button
                  className="flex items-center justify-start rounded bg-secondary-400 px-4 py-2 text-sm text-white hover:bg-secondary-500 dark:bg-secondary-800 dark:hover:bg-secondary-700"
                  onClick={() => handleReply(doubt.id)}
                >
                  Reply&nbsp;
                  <ImReply />
                </button>
              </div>
            ) : (
              <button
                className="mt-1 rounded bg-secondary-400 px-3 py-2 text-sm text-white hover:bg-secondary-500 dark:bg-secondary-800 dark:hover:bg-secondary-700"
                onClick={() => setReplyId(doubt.id)}
              >
                Reply
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-col items-center">
        <div>
          <input
            type="text"
            placeholder="Enter your doubt"
            value={doubt}
            onChange={(e) => setDoubt(e.target.value)}
            onKeyDown={handleDoubtEnterBtn}
            className="mb-4 w-full rounded border border-secondary-300 px-4 py-2 outline-none sm:w-96"
          />
        </div>
        <div className="flex w-full flex-row-reverse">
          <div>
            <button
              className="flex items-center justify-end rounded bg-secondary-400 px-4 py-2 text-sm hover:bg-secondary-500 dark:bg-secondary-800 dark:hover:bg-secondary-700"
              onClick={handleAddDoubt}
            >
              Add Doubt&nbsp;
              <TbLocationQuestion className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDoubts;

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
    <div className="flex flex-col items-center justify-centermb-5">
      <h1 className="text-xl font-semibold m-5">Ask your Doubts !!</h1>
      <div className=" w-full bg-primary-600 h-[70vh]  p-4 md:p-2 rounded-md ">
        {doubts?.map((doubt: any, index: number) => (
          <div key={index} className="border p-3 my-4 rounded-lg ">
            <h2 className="text-xl font-semibold text-secondary-50">
              {doubt.title}
            </h2>
            <p className="text-secondary-100">{doubt.description}</p>
            {doubt.response.map((res: any, index: number) => (
              <div
                key={index}
                className="border p-1 my-2 text-wrap overflow-auto rounded-lg flex justify-between items-center"
              >
                <div className="">
                  <p className=" text-secondary-50 break-words">
                    {res?.description}
                  </p>
                </div>
                <div>
                  <button
                    className="text-lg p-1 dark:bg-secondary-800 dark:hover:bg-secondary-700 bg-secondary-400 hover:bg-secondary-500  text-white rounded mx-2"
                    onClick={() => handleDeleteReply(res.id)}
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            ))}
            <button
              className="px-3 py-2 text-sm mb-3 dark:bg-secondary-800 dark:hover:bg-secondary-700 bg-secondary-400 hover:bg-secondary-500  text-white rounded mr-2"
              onClick={() => handleDeleteDoubt(doubt.id)}
            >
              Delete
            </button>
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
                  className="px-4 py-2 dark:bg-secondary-800 dark:hover:bg-secondary-700 bg-secondary-400 hover:bg-secondary-500  flex items-center justify-start text-white rounded text-sm"
                  onClick={() => handleReply(doubt.id)}
                >
                  Reply&nbsp;
                  <ImReply />
                </button>
              </div>
            ) : (
              <button
                className="px-3 py-2 mt-1 text-sm  dark:bg-secondary-800 dark:hover:bg-secondary-700 bg-secondary-400 hover:bg-secondary-500 text-white rounded"
                onClick={() => setReplyId(doubt.id)}
              >
                Reply
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center mt-4">
        <div>
          <input
            type="text"
            placeholder="Enter your doubt"
            value={doubt}
            onChange={(e) => setDoubt(e.target.value)}
            onKeyDown={handleDoubtEnterBtn}
            className="w-full sm:w-96 px-4 py-2 border outline-none border-secondary-300 rounded mb-4"
          />
        </div>
        <div className=" flex w-full flex-row-reverse">
          <div>
            <button
              className="px-4 py-2 flex justify-end items-center bg-secondary-400 hover:bg-secondary-500 dark:hover:bg-secondary-700  dark:bg-secondary-800 text-sm rounded"
              onClick={handleAddDoubt}
            >
              Add Doubt&nbsp;
              <TbLocationQuestion className=" w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDoubts;

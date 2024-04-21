"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UserDoubts = ({ userDoubts, classId }:any) => {
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

  const handleReply = async (id:string) => {

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
        doubts.map((d:any) =>
          d.id === id
            ? { ...d, response: [...d.response, res.data] }
            : d
        )
      );
    }
  }

  const handleDeleteDoubt = async (id:string) => {
    alert("Are you sure you want to delete this doubt?");
    const res = await axios.delete(`/api/doubts/deleteDoubt/${id}`);
    if (res.data.error) {
      toast.error("Failed to delete doubt");
    } else {
      toast.success("Doubt deleted successfully");
      setDoubts(doubts.filter((d:any) => d.id !== id));
    }
  }

  const handleDeleteReply = async (replyId :string) => {
    alert("Are you sure you want to delete this reply?");
    const res = await axios.delete(`/api/doubts/reply/${replyId}`);
    if (res.data.error) {
      toast.error("Failed to delete reply");
    } else {
      toast.success("Reply deleted successfully");
      setDoubts(
        doubts.map((d:any) => ({
          ...d,
          response: d.response.filter((r:any) => r.id !== replyId),
        }))
      );
    }
  }

  return (
    <div>
      <h1>Doubts | Timestamps</h1>
      <div className="w-96 bg-secondary-600 p-4 rounded h-full">
        {doubts?.map((doubt:any, index:number) => {
          return (
            <div key={index} className="border p-4 my-4 rounded-lg">
              <h2 className="text-xl font-semibold text-secondary-500">
                {doubt.title}
              </h2>
              <p className="text-secondary-300">{doubt.description}</p>
              {doubt.response.map((res:any, index:number) => {
                return (
                  <div key={index} className="border p-4 my-4 rounded-lg">
                    <p className="text-secondary-300">{res.description}</p>
                    <button
                      className="p-2 bg-secondary-500 text-white rounded mx-2"
                      onClick={() => handleDeleteReply(res.id)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
              <button
                className="p-2 bg-secondary-500 text-white rounded mx-2"
                onClick={() => handleDeleteDoubt(doubt.id)}
              >
                Delete
              </button>

              {replyId === doubt.id ? (
                <div>
                  <input
                    type="text"
                    placeholder="Enter your reply"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                  <button
                    className="p-2 bg-secondary-500 text-white rounded"
                    onClick={() => handleReply(doubt.id)}
                  >
                    Add Reply
                  </button>
                </div>
              ) : (
                <button
                  className="p-2 bg-secondary-500 text-white rounded"
                  onClick={() => {
                    setReplyId(doubt.id);
                  }}
                >
                  reply
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter your doubt"
          value={doubt}
          onChange={(e) => setDoubt(e.target.value)}
        />
        <button
          className="p-2 bg-secondary-500 text-white rounded"
          onClick={handleAddDoubt}
        >
          Add Doubt
        </button>
      </div>
    </div>
  );
};

export default UserDoubts;

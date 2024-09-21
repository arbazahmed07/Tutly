"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCrown } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { LuReply } from "react-icons/lu";
import { PiCrownSimpleFill } from "react-icons/pi";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button"

export default function Accordion({
  doubts,
  currentUser,
  currentCourseId,
}: any) {
  const [openAccordion, setOpenAccordion] = useState<number>(-1);
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [dbts, setDbts] = useState(doubts || []);
  const [doubt, setDoubt] = useState<string>("");
  const [reply, setReply] = useState<string>("");
  const [replyId, setReplyId] = useState<string>("");

  useEffect(() => {
    setDbts(doubts);
  }, [currentCourseId]);

  const QA = dbts;

  const handleAddDoubt = async (data: any) => {
    const res = await axios.post("/api/doubts/postDoubt", {
      courseId: currentCourseId,
      title: undefined,
      description: data.message,
    });
    if (res.data.error) {
      toast.error("Failed to add doubt");
    } else {
      toast.success("Doubt added successfully");
      setDoubt("");
      if (!doubt) setDbts([res.data]);
      else setDbts([...doubts, res.data]);
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
      if (!doubts) setDbts([res.data]);
      else
        setDbts(
          doubts?.map((d: any) =>
            d && d?.id === id
              ? { ...d, response: [...d.response, res.data] }
              : d,
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
      setDbts(doubts.filter((d: any) => d.id !== id));
    }
  };

  const handleDeleteReply = async (replyId: string) => {
    alert("Are you sure you want to delete this reply?");
    const res = await axios.delete(`/api/doubts/reply/${replyId}`);
    if (res.data.error) {
      toast.error("Failed to delete reply");
    } else {
      toast.success("Reply deleted successfully");
      setDbts(
        doubts.map((d: any) => ({
          ...d,
          response: d.response.filter((r: any) => r.id !== replyId),
        })),
      );
    }
  };

  const handleReplyEnterBtn = (e: any) => {
    handleReply(replyId);
  };

  const handleEscKeyDown = (e: any) => {
    if (e.key === "Escape") {
      setShow(false);
    }
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      message: message,
    };
    if (!data.message) {
      toast.error("Please enter a message");
      return;
    }
    handleAddDoubt(data);
    setShow(false);
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  function formatDateTime(dateTimeString: string) {
    const dateTime = new Date(dateTimeString);

    const day = dateTime.getDate().toString().padStart(2, "0");
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    const year = dateTime.getFullYear().toString().slice(-2);

    let hour = dateTime.getHours();
    const minute = dateTime.getMinutes().toString().padStart(2, "0");
    const ampm = hour >= 12 ? "pm" : "am";
    hour = hour % 12 || 12;

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hour}:${minute} ${ampm}`;

    return `${formattedDate} , ${formattedTime}`;
  }
  const [popover, setPopover] = useState(false);
  const togglePopover = () => {
    setPopover((prev) => !prev);
  };
  const addDoubtRef = useRef(null);

  return (
    <div className="w-full bg-gradient-to-l md:min-w-[800px]">
      <div className="flex flex-col items-center text-sm font-medium">
        <div className='w-full flex flex-row-reverse'>
           <Button onClick={() => { handleShow(); setOpenAccordion(-1); }} className="py-3 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white">
            {
              currentUser.role === 'STUDENT' ? "Ask a Doubt" : "Raise a Query"
            }
          </Button>
        </div>
        <Dialog open={show} onOpenChange={() => setShow(false)}>
          <DialogTitle>Enter your doubt here</DialogTitle>
          <DialogContent>
            <form className="mt-2" onSubmit={handleSubmit} onKeyDown={handleEscKeyDown}>
              <textarea ref={addDoubtRef} id="message" placeholder='Start here...' onChange={(e) => handleChange(e)} onKeyDown={handleEscKeyDown} rows={4} value={message} className="block p-2.5 w-full rounded-lg outline-none bg-white border-2 text-secondary-950 "></textarea>
              <Button onClick={() => setShow(false)} className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md mt-3  mr-4">Cancel</Button>
            <Button type="submit" onClick={handleSubmit} className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mt-3">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {doubts?.length !== 0 && (
        <div
          id="accordion-color"
          data-accordion="collapse"
          className="mt-5 cursor-pointer"
        >
          {QA?.map((qa: any, index: number) => (
            <div
              key={index}
              onClick={() => toggleAccordion(index)}
              className={`relative m-3 cursor-pointer rounded-md ${openAccordion === index ? "shadow-xl" : "shadow-3xl"} bg-white p-2 text-zinc-600 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]`}
            >
              <div
                className={`flex w-full flex-wrap items-center justify-between gap-3 p-3 font-medium`}
              >
                <div className="relative ml-2 flex items-center justify-start space-x-5">
                  {qa.user.role === "STUDENT" && (
                    <Image
                      unoptimized
                      src={qa.user?.image || "/images/placeholder.jpg"}
                      alt="profile"
                      width={30}
                      height={30}
                      className="rounded-full shadow-lg shadow-fuchsia-500/50 ring ring-fuchsia-600 ring-offset-1"
                    />
                  )}
                  {qa.user.role === "MENTOR" && (
                    <div className="relative">
                      <FaCrown className="absolute -left-3 -top-3 -rotate-45 text-yellow-400 shadow-yellow-500 drop-shadow-sm hover:text-yellow-500" />

                      <Image
                        unoptimized
                        src={qa.user?.image || "/images/placeholder.jpg"}
                        alt="profile"
                        width={30}
                        height={30}
                        className="rounded-full shadow-lg shadow-yellow-400/50"
                      />
                    </div>
                  )}
                  {qa.user.role === "INSTRUCTOR" && (
                    <div className="relative">
                      <FaCrown className="absolute -left-3 -top-3 -rotate-45 text-red-500 shadow-red-500 drop-shadow-sm hover:text-red-600" />
                      <Image
                        unoptimized
                        src={qa.user?.image || "/images/placeholder.jpg"}
                        alt="profile"
                        width={30}
                        height={30}
                        className="rounded-full shadow-lg shadow-red-400/50"
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-start gap-1">
                    <div className="flex flex-row justify-start gap-3">
                      <p className="text-xs font-semibold">{qa?.user?.name} </p>
                      <p className="text-xs font-medium">
                        {" "}
                        [ {qa.user?.username} ]
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium">
                        Posted on {formatDateTime(qa?.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-7">
                  {/* your reply for that answer */}
                  <div>
                    <Button
                      title="Reply"
                      className="p-1"
                      onClick={() => {
                        togglePopover();
                        setReplyId(qa.id);
                      }}
                    >
                      <LuReply className="cursor-pointer w-5 h-5" />
                    </Button>
                  </div>
                  <div hidden={currentUser.role !== 'INSTRUCTOR' && qa.user.role === 'INSTRUCTOR'}>
                    <Button
                      hidden={currentUser.role === 'STUDENT'}
                      className="p-1 mr-2"
                      onClick={() => handleDeleteDoubt(qa.id)}
                    >
                      <MdDelete className='cursor-pointer  w-5 h-5 text-red-500 hover:text-red-600' />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mx-4 flex items-center justify-between">
                <div>
                  <h1 className="rounded-md text-justify text-sm font-semibold">
                    {qa.description}
                  </h1>
                </div>
                <div
                  onClick={() => toggleAccordion(index)}
                  className="rounded-lg border-2 border-blue-500 px-3 py-1.5 text-sm font-medium"
                >
                  <span className="rounded-full p-1">
                    {qa.response.length}{" "}
                  </span>
                  | {openAccordion === index ? "Hide" : "Show"} replies
                </div>
              </div>
              {openAccordion === index && qa.response.length === 0 && (
                <div className="m-2 flex items-center justify-center space-x-2 rounded-lg bg-secondary-200 p-3 hover:bg-secondary-300">
                  <p className="text-medium flex items-center justify-start font-bold text-gray-800">
                    No responses
                  </p>
                </div>
              )}
              {/* Replies */}
              <div className="flex px-3 mt-2 items-center">
                {
                  popover && replyId === qa?.id && (
                    <div className="bg-white border-2 rounded-lg p-3 w-full">
                      <textarea
                        placeholder="Enter your reply"
                        value={reply}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleReplyEnterBtn(qa.id);
                          }
                          if (e.key === 'Escape') {
                            setReplyId('');
                          }
                        }}
                        onChange={(e) => setReply(e.target.value)}
                        className="w-full p-2 bg-white text-gray-800 border-2 rounded-lg outline-none text-sm"
                      ></textarea>
                      <div className="flex justify-end text-sm font-medium mt-3">
                        <Button
                          title="Close"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
                          onClick={() => setReplyId('')}
                        >
                          ✖ <p className="ml-1.5">Cancel</p>
                        </Button>
                        <Button
                          title="Send"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-blue-600 bg-blue-500 text-white rounded-lg"
                          onClick={() => handleReply(qa.id)}
                        >
                          ✔ <p className="ml-1.5">Reply</p>
                        </Button>
                      </div>
                    </div>
                )}
              </div>
              {openAccordion === index && qa?.response.length > 0 && (
                <div className="rounded-lg bg-white p-3 text-black">
                  <p className="mb-2 text-sm font-semibold">Replies :</p>
                  {qa?.response.map((r: any, responseIndex: number) => (
                    <div
                      key={responseIndex}
                      className="mb-2 rounded-lg border-2 p-4 text-zinc-600 hover:bg-zinc-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-5">
                          {r.user?.role === "STUDENT" && (
                            <Image
                              unoptimized
                              src={r.user?.image || "/images/placeholder.jpg"}
                              alt="profile"
                              width={30}
                              height={30}
                              className="rounded-full shadow-lg shadow-fuchsia-500/50 ring ring-fuchsia-600 ring-offset-1"
                            />
                          )}
                          {r.user?.role === "MENTOR" && (
                            <div className="relative">
                              <FaCrown className="absolute -left-3 -top-3 -rotate-45 text-yellow-400 shadow-yellow-500 drop-shadow-sm hover:text-yellow-500" />
                              <Image
                                unoptimized
                                src={r.user?.image || "/images/placeholder.jpg"}
                                alt="profile"
                                width={30}
                                height={30}
                                className="rounded-full shadow-lg shadow-yellow-400/50"
                              />
                            </div>
                          )}
                          {r.user?.role === "INSTRUCTOR" && (
                            <div className="relative">
                              <PiCrownSimpleFill className="absolute -left-3 -top-3 -rotate-45 text-red-400 shadow-red-500 drop-shadow-sm hover:text-red-500" />
                              <Image
                                unoptimized
                                src={r.user?.image || "/images/placeholder.jpg"}
                                alt="profile"
                                width={30}
                                height={30}
                                className="rounded-full shadow-lg shadow-red-400/50"
                              />
                            </div>
                          )}
                          <div className="flex flex-col justify-start gap-1">
                            <div className="flex flex-row justify-start gap-3">
                              <p className="text-xs font-semibold">
                                {r?.user?.name}{" "}
                              </p>
                              <p className="text-xs font-medium">
                                {" "}
                                [ {r?.user?.username} ]
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-medium">
                                Posted on {formatDateTime(r?.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div hidden={r.user.role === 'INSTRUCTOR' && currentUser.role !== 'INSTRUCTOR'} >
                          {
                            (currentUser.role === 'MENTOR' || currentUser.role === 'INSTRUCTOR') &&
                            <Button onClick={() => handleDeleteReply(r.id)}>
                              <MdDelete className='cursor-pointer w-5 h-5 text-red-500 hover:text-red-600' />
                            </Button>
                          }
                        </div>
                      </div>
                      <div className="-mb-2 mt-2 text-sm font-semibold">
                        {r.description}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

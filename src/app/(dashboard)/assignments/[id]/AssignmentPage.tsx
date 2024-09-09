"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { RiWhatsappLine } from "react-icons/ri";

import { FaExternalLinkSquareAlt } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import day from "@/lib/dayjs";

export default function AssignmentPage({
  params,
  currentUser,
  assignment,
  assignments,
  notSubmittedMentees,
}: {
  params: { id: string };
  currentUser: any;
  assignment: any;
  assignments: any;
  notSubmittedMentees: any;
}) {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedScores, setEditedScores] = useState({
    responsiveness: 0,
    styling: 0,
    other: 0,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  const messages = [
    "Hi, how are you?",
    "Complete your assignments on time !!",
    "Make sure to review the recorded lectures for better understanding",
    "Good Work in web development,Keep Going",
    "Don't forget to participate actively in class discussions!",
    "Ask questions if you need clarification; we’re here to help!",
    "Maintain proper attendance,your attendance was poor",
  ];
  const [modal, setModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleWhatsAppClick = (phone: string) => {
    setPhoneNumber(phone);
    setModal(true);
  };

  const handleSend = (message: string) => {
    const url = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}&app_absent=0`;
    window.location.href = url;
    setModal(false);
  };
  const router = useRouter();

  const searchParams = useSearchParams();

  const username = searchParams?.get("username");
  let filteredAssignments = [];
  // if (!username) {
  filteredAssignments = assignments?.filter(
    (x: any) =>
      x.enrolledUser.username
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      x.enrolledUser.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredNonSubmittedMentees = notSubmittedMentees?.filter(
    (x: any) =>
      x.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      x.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // }

  if (username) {
    filteredAssignments = filteredAssignments.filter(
      (x: any) => x.enrolledUser.username === username
    );
  }

  const handleFeedback = async (submissionId: string) => {
    try {
      const res = await axios.post("/api/feedback", {
        submissionId: submissionId,
        feedback: feedback,
      });
      toast.success("Feedback saved successfully");
    } catch (e: any) {
      toast.error("Failed to save feedback");
    }
  };

  const handleEdit = (index: number, submissionId: string) => {
    setEditingIndex(index);
    const submission = filteredAssignments.find(
      (x: any) => x.id === submissionId
    );
    const rValue =
      submission &&
      submission.points.find(
        (point: any) => point.category === "RESPOSIVENESS"
      );
    const sValue =
      submission &&
      submission.points.find((point: any) => point.category === "STYLING");
    const oValue =
      submission &&
      submission.points.find((point: any) => point.category === "OTHER");
    setEditedScores({
      responsiveness: rValue ? rValue.score : 0,
      styling: sValue ? sValue.score : 0,
      other: oValue ? oValue.score : 0,
    });

    // router.refresh();
  };

  const handleSave = async (index: number) => {
    try {
      toast.loading("Updating Scores...");

      let marks = [];
      if (editedScores.responsiveness > 0) {
        marks.push({
          category: "RESPOSIVENESS",
          score: editedScores.responsiveness,
        });
      }
      if (editedScores.styling > 0) {
        marks.push({
          category: "STYLING",
          score: editedScores.styling,
        });
      }
      if (editedScores.other > 0) {
        marks.push({
          category: "OTHER",
          score: editedScores.other,
        });
      }

      const res = await axios.post("/api/points", {
        submissionId: filteredAssignments[index].id,
        marks: marks,
      });
      toast.dismiss();
      toast.success("Scores saved successfully");
      router.refresh();
    } catch (e: any) {
      toast.dismiss();
      toast.error("Failed to save scores");
    } finally {
      setEditingIndex(-1);
      setFeedback("");
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    const response = confirm(
      "Are you sure you want to delete this submission?"
    );
    if (!response) return;
    try {
      toast.loading("Deleting Submission...");
      const res = await axios.delete(`/api/submissions/${id}`);
      toast.dismiss();
      toast.success("Submission deleted successfully");
      router.refresh();
    } catch (e: any) {
      toast.dismiss();
      toast.error("Failed to delete submission");
      setFeedback("");
    }
  };

  const [nonSubmissions, setNonSubmissions] = useState<boolean>(false);

  return (
    <div className="mx-2 md:mx-10 my-2 relative">
      <h1 className="text-center p-2 bg-gradient-to-l from-blue-500 to-blue-600 text-white rounded text-sm md:text-lg font-medium">
        Assignment Submission : {assignment?.title}
      </h1>

      <div className="flex items-center justify-between my-4 text-xs md:text-sm font-medium">
        <p className="rounded p-1 px-2 bg-secondary-500 text-white">
          # {assignment?.class?.course?.title}
        </p>
        <div className="flex justify-center items-center gap-4">
          {assignment?.dueDate != null && (
            <div
              className={`p-1 px-2 rounded text-white ${
                new Date(assignment?.dueDate) > new Date()
                  ? "bg-primary-600"
                  : "bg-secondary-500"
              }`}
            >
              Last Date : {assignment?.dueDate.toISOString().split("T")[0]}
            </div>
          )}
        </div>
      </div>
      <div className=" flex justify-between items-center w-full">
        <span className="block mt-5">Details : 👇</span>
        <div className="flex justify-center items-center gap-4">
          <h1 className="border rounded-md p-1 text-sm">
            Max responses : {assignment?.maxSubmissions}
          </h1>
          {currentUser?.role === "INSTRUCTOR" && (
            <button
              onClick={() => router.push(`/attachments/edit/${assignment.id}`)}
              className=" p-1 px-3 bg-emerald-700 hover:bg-emerald-800 rounded-md"
            >
              edit
            </button>
          )}
        </div>
      </div>
      <div className="my-5">
        {assignment?.details || "No details given to show"}
      </div>

      <div className="flex flex-col text-black my-4 gap-4">
        <div>
          <a
            target="_blank"
            href={`${assignment?.link}`}
            className="text-sm text-blue-400 font-semibold break-words"
          >
            {assignment?.link}
          </a>
        </div>

        {currentUser?.role === "STUDENT" ? (
          <StudentAssignmentSubmission
            courseId={assignment.courseId}
            assignment={assignment}
          />
        ) : (
          <>
            <div className="flex justify-between mt-8">
              <div className="block mt-7 dark:text-white max-sm:me-2 max-sm:text-sm max-sm:w-full ">
                Submissions : 👇
              </div>
              <div className="sm:flex sm:items-center gap-4 max-sm:space-y-3 max-sm:w-full max-sm:justify-between ">
                <div className="max-sm:w-full max-sm:justify-between max-sm:flex gap-4 ">
                  <button
                    onClick={() => setNonSubmissions(!nonSubmissions)}
                    className="text-secondary-400 italic hover:text-white max-sm:text-sm me-5"
                  >
                    {!nonSubmissions ? (
                      <h1>Not received from?</h1>
                    ) : (
                      <h1>Received from?</h1>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      if (username) {
                        router.push(
                          `/assignments/${params.id}/evaluate?username=${username}`
                        );
                      } else {
                        router.push(`/assignments/${params.id}/evaluate`);
                      }
                    }}
                    className="bg-primary-600 inline px-3.5 py-2 text-sm rounded font-semibold text-white"
                  >
                    Evaluate
                  </button>
                </div>
                <div className="flex items-center m-auto md:m-0 bg-secondary-200 border text-black rounded">
                  <input
                    title="input"
                    className="p-2 outline-none text-sm font-medium rounded-l border-r border-black bg-secondary-200"
                    placeholder="search username"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FaSearch className="h-5 w-5 m-2" />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              {nonSubmissions ? (
                <table className="text-center w-full">
                  <thead className="bg-secondary-300 text-secondary-700 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                        sl.no
                      </th>
                      <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider sticky left-0 text-secondary-700 bg-secondary-300 ">
                        username
                      </th>
                      <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                        mentor
                      </th>
                      <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                        Notify
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredNonSubmittedMentees?.map(
                      (user: any, index: any) => {
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap`}>
                              <h1>{user.username}</h1>
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap`}>
                              <h1>{user.mentorUsername}</h1>
                            </td>
                            <td
                              className={`flex justify-center px-6 py-4 whitespace-nowrap`}
                            >
                              <RiWhatsappLine
                                className="h-6 w-6"
                                onClick={() =>
                                  handleWhatsAppClick("9160804126")
                                }
                              />
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              ) : (
                <table className="text-center w-full">
                  <thead className="bg-secondary-300 text-secondary-700 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                        sl.no
                      </th>
                      <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider sticky left-0 text-secondary-700 bg-secondary-300 ">
                        username
                      </th>
                      <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                        Responsive(10)
                      </th>
                      <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                        Styling(10)
                      </th>
                      <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                        Others(10)
                      </th>
                      <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                        Feedback
                      </th>
                      {currentUser.role !== "STUDENT" && (
                        <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAssignments?.map((submission: any, index: any) => {
                      const rValue = submission.points.find(
                        (point: any) => point.category === "RESPOSIVENESS"
                      );
                      const sValue = submission.points.find(
                        (point: any) => point.category === "STYLING"
                      );
                      const oValue = submission.points.find(
                        (point: any) => point.category === "OTHER"
                      );

                      const totalScore = [rValue, sValue, oValue].reduce(
                        (acc, currentValue) => {
                          return acc + (currentValue ? currentValue.score : 0);
                        },
                        0
                      );

                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="sticky left-0 bg-white divide-gray-200">
                            <h1>{submission.enrolledUser.username}</h1>
                            <h1 className="text-xs">
                              {submission.enrolledUser.mentorUsername}
                            </h1>
                          </td>
                          <td className="px-6 text-sm py-4 whitespace-nowrap">
                            {day(submission.submissionDate).format(
                              "DD MMM YYYY, hh:mm:ss A"
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {editingIndex === index ? (
                              <input
                                title="null"
                                type="number"
                                value={editedScores.responsiveness}
                                onChange={(e) => {
                                  const newScore = parseInt(e.target.value);
                                  if (
                                    !isNaN(newScore) &&
                                    newScore >= 0 &&
                                    newScore <= 10
                                  ) {
                                    setEditedScores((prevScores) => ({
                                      ...prevScores,
                                      responsiveness: newScore,
                                    }));
                                  }
                                }}
                                min={0}
                                max={10}
                                className="bg-transparent border-black rounded-lg px-2 border-2 text-background w-20"
                              />
                            ) : (
                              rValue?.score || "NA"
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {editingIndex === index ? (
                              <input
                                title="null"
                                type="number"
                                value={editedScores.styling}
                                onChange={(e) => {
                                  const newScore = parseInt(e.target.value);
                                  if (
                                    !isNaN(newScore) &&
                                    newScore >= 0 &&
                                    newScore <= 10
                                  ) {
                                    setEditedScores((prevScores) => ({
                                      ...prevScores,
                                      styling: newScore,
                                    }));
                                  }
                                }}
                                min={0}
                                max={10}
                                className="bg-transparent border-black rounded-lg px-2 border-2 text-background w-20"
                              />
                            ) : (
                              sValue?.score || "NA"
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {editingIndex === index ? (
                              <input
                                title="null"
                                type="number"
                                value={editedScores.other}
                                onChange={(e) => {
                                  const newScore = parseInt(e.target.value);
                                  if (
                                    !isNaN(newScore) &&
                                    newScore >= 0 &&
                                    newScore <= 10
                                  ) {
                                    setEditedScores((prevScores) => ({
                                      ...prevScores,
                                      other: newScore,
                                    }));
                                  }
                                }}
                                min={0}
                                max={10}
                                className="bg-transparent border-black rounded-lg px-2 border-2 text-background w-20"
                              />
                            ) : (
                              oValue?.score || "NA"
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {rValue?.score || sValue?.score || oValue?.score
                              ? totalScore
                              : "NA"}
                          </td>
                          <td>
                            {editingIndex === index ? (
                              <textarea
                                title="null"
                                value={feedback}
                                defaultValue={submission.overallFeedback}
                                onChange={(e) => {
                                  setFeedback(e.target.value);
                                }}
                                className="bg-transparent block min-w-16 text-start overflow-y-hidden border-black rounded-lg px-2 border-2 text-background m-2"
                              ></textarea>
                            ) : (
                              submission.overallFeedback || "NA"
                            )}
                          </td>
                          {currentUser.role !== "STUDENT" && (
                            <td className="px-6 py-4 whitespace-nowrap">
                              {editingIndex === index ? (
                                <div className="  flex items-center justify-center gap-5">
                                  <button
                                    onClick={() => {
                                      handleSave(index);
                                      handleFeedback(submission.id);
                                    }}
                                    className="text-blue-600 font-semibold text-sm hover:text-blue-700"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingIndex(-1)}
                                    className=" text-red-600 hover:text-red-700 text-sm font-semibold "
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center gap-3">
                                  <Link
                                    href={`/playgrounds/html-css-js?submissionId=${submission.id}`}
                                    className="rounded-full p-1 hover:text-primary-500 text-lg"
                                  >
                                    <FaEye />
                                  </Link>
                                  <button
                                    onClick={() => {
                                      handleEdit(index, submission.id);
                                    }}
                                    className="rounded-full p-1 hover:text-primary-500 text-md"
                                  >
                                    <FiEdit />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(submission.id)}
                                    className="rounded-full p-1 hover:text-white text-lg hover:bg-red-500"
                                  >
                                    <MdOutlineDelete />
                                  </button>
                                </div>
                              )}
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
              {modal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                  <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
                    <h2 className="text-lg font-semibold mb-4">
                      Select a message to send
                    </h2>
                    <div className="flex flex-col gap-2">
                      {messages.map((msg, index) => (
                        <div
                          key={index}
                          className="flex gap-4 justify-between border-b border-slate-500 mb-2"
                        >
                          <p className="text-sm">{msg}</p>
                          <button
                            onClick={() => handleSend(msg)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Send
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setModal(false)}
                      className="mt-4 bg-gray-200 hover:bg-gray-300 rounded px-4 py-2"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const StudentAssignmentSubmission = ({
  assignment,
  courseId,
}: {
  assignment: any;
  courseId: string;
}) => {
  const [externalLink, setExternalLink] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const maxSubmissions = assignment.maxSubmissions;
      if (maxSubmissions <= assignment.submissions.length) {
        toast.error("Assignment has reached the maximum number of submissions");
        return;
      }

      toast.loading("Submitting assignment...");
      const res = await axios.post("/api/assignment/submitExternal", {
        assignmentId: assignment.id,
        externalLink: externalLink,
        maxSubmissions: maxSubmissions,
        courseId: courseId,
      });

      toast.dismiss();
      toast.success("Assignment submitted successfully");
      router.refresh();
    } catch (e) {
      toast.dismiss();
      toast.error("Error submitting assignment");
    } finally {
      setExternalLink("");
    }
  };

  return (
    <>
      <div>
        {assignment?.maxSubmissions <= assignment.submissions.length ? (
          <div className="text-white font-semibold text-lg text-center my-5">
            No more responses are accepted!
          </div>
        ) : assignment.submissionMode === "HTML_CSS_JS" ? (
          <Link
            href={`/playgrounds/html-css-js?assignmentId=${assignment.id}`}
            target="_blank"
          >
            <button className="bg-blue-600 inline p-2 text-sm text-white rounded font-semibold">
              {assignment?.submissions.length === 0
                ? "Submit through Playground"
                : "Submit another response"}
            </button>
          </Link>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-blue-600 inline p-2 text-sm text-white rounded font-semibold">
                {assignment?.submissions.length === 0
                  ? "Submit External Link"
                  : "Submit another response"}
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add External Link</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-5 items-center gap-4 pb-3">
                    <Label
                      htmlFor="externalLink"
                      className="text-center text-lg"
                    >
                      Link
                    </Label>
                    <Input
                      id="externalLink"
                      value={externalLink}
                      onChange={(e) => setExternalLink(e.target.value)}
                      placeholder="https://codesandbox.io/p/sandbox/..."
                      className="col-span-4 "
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                  >
                    Send
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <h1>
        <span className="block mt-5 dark:text-white">Submissions : 👇</span>
      </h1>
      <div className="overflow-x-auto">
        <table className="text-center w-full">
          <thead className="bg-secondary-300 text-secondary-700">
            <tr>
              <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                sl.no
              </th>
              <th
                className={`px-6 py-3 text-sm font-medium uppercase tracking-wider`}
              >
                View Submission
              </th>
              <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                Submission Date
              </th>
              <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                Feedback
              </th>
              <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assignment?.submissions.map((submission: any, index: any) => {
              const rValue = submission.points.find(
                (point: any) => point.category === "RESPOSIVENESS"
              );
              const sValue = submission.points.find(
                (point: any) => point.category === "STYLING"
              );
              const oValue = submission.points.find(
                (point: any) => point.category === "OTHER"
              );

              const totalScore = [rValue, sValue, oValue].reduce(
                (acc, currentValue) => {
                  return acc + (currentValue ? currentValue.score : 0);
                },
                0
              );

              return (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className={`px-6 py-4 whitespace-nowrap`}>
                    <Link
                      href={
                        assignment.submissionMode === "HTML_CSS_JS"
                          ? `/playgrounds/html-css-js?submissionId=${submission.id}`
                          : submission.submissionLink
                      }
                      target="_blank"
                      className="text-blue-400 font-semibold break-words"
                    >
                      view
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {submission.submissionDate.toISOString().split("T")[0] ||
                      "NA"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {submission.overallFeedback || "NA"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {totalScore ? "Submitted" : "NA"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

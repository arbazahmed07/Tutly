"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { FaCheck, FaSearch } from "react-icons/fa";

export default function AssignmentPage({
  params,
  currentUser,
  assignment,
  assignments,
}: {
  params: { id: string };
  currentUser: any;
  assignment: any;
  assignments: any;
}) {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedScores, setEditedScores] = useState({
    responsiveness: 0,
    styling: 0,
    other: 0,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  const router = useRouter();

  const searchParams = useSearchParams();

  const userId = searchParams?.get("userId");
  let filteredAssignments = [];
  if (!userId) {
    filteredAssignments = assignments?.filter(
      (x: any) =>
        x.enrolledUser.username
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        x.enrolledUser.username
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
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

      const res = await axios.post("/api/points", {
        submissionId: filteredAssignments[index].id,
        marks: [
          {
            category: "RESPOSIVENESS",
            score: editedScores.responsiveness,
          },
          {
            category: "STYLING",
            score: editedScores.styling,
          },
          {
            category: "OTHER",
            score: editedScores.other,
          },
        ],
      });
      toast.dismiss();
      toast.success("Scores saved successfully");
      router.refresh();
    } catch (e: any) {
      toast.dismiss();
      toast.error("Failed to save scores");
    } finally {
      setEditingIndex(-1);
      router.refresh();
    }
  };

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

        <div
          hidden={
            currentUser?.role === "MENTOR" || currentUser?.role === "INSTRUCTOR"
          }
        >
          {assignment?.maxSubmissions <= assignment.submissions.length ? (
            <div className="text-white font-semibold text-lg text-center my-5">
              No more responses are accepted!
            </div>
          ) : (
            <Link href={`/playground/html-css-js?assignmentId=${params.id}`}>
              {assignment?.submissions.length === 0 ? (
                <button className="bg-blue-600 inline p-2 text-sm text-white rounded font-semibold">
                  Submit through Playground
                </button>
              ) : (
                <button className="bg-primary-600 inline p-2 text-sm rounded font-semibold text-white">
                  Submit another response
                </button>
              )}
            </Link>
          )}
        </div>
        {userId &&
        assignment.submissions.length > 0 &&
        currentUser?.role === "STUDENT" ? (
          <>
            <h1>
              <span className="block mt-5 dark:text-white">
                Submissions : 👇
              </span>
            </h1>
            <div className="overflow-x-auto">
              <table className="text-center w-full">
                <thead className="bg-secondary-300 text-secondary-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-sm font-medium uppercase tracking-wider"
                    >
                      sl.no
                    </th>
                    <th
                      scope="col"
                      className={`${
                        currentUser?.role === "STUDENT" && "hidden"
                      } px-6 py-3 text-sm font-medium uppercase tracking-wider`}
                    >
                      Submission Link
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-sm font-medium uppercase tracking-wider"
                    >
                      Submission Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-sm font-medium uppercase tracking-wider"
                    >
                      Feedback
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-sm font-medium uppercase tracking-wider"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assignment?.submissions.map(
                    (submission: any, index: any) => {
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
                          <td
                            className={`${
                              currentUser?.role === "STUDENT" && "hidden"
                            } px-6 py-4 whitespace-nowrap`}
                          >
                            <Link
                              href={`/playground/html-css-js?submissionId=${submission.id}`}
                              className="text-blue-400 font-semibold break-words"
                            >
                              view
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {submission.submissionDate
                              .toISOString()
                              .split("T")[0] || "NA"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {submission.overallFeedback || "NA"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {totalScore || "NA"}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : currentUser?.role === "MENTOR" ||
          currentUser?.role === "INSTRUCTOR" ? (
          <>
            <div className="flex justify-between">
              <div className="block mt-5 dark:text-white">Submissions : 👇</div>
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    router.push(`/assignments/${params.id}/evaluate`)
                  }
                  className="bg-primary-600 inline px-2 py-1 text-sm rounded font-semibold text-white"
                >
                  Evaluate
                </button>
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
              <table className="text-center w-full">
                <thead className="bg-secondary-300 text-secondary-700 sticky top-0">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-sm font-medium uppercase tracking-wider"
                    >
                      sl.no
                    </th>
                    <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider sticky left-0 text-secondary-700 bg-secondary-300 ">
                      username
                    </th>
                    <th
                      scope="col"
                      className={`${
                        currentUser?.role === "STUDENT" && "hidden"
                      } px-6 py-3 text-sm font-medium uppercase tracking-wider`}
                    >
                      Submission Link
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-sm font-medium uppercase tracking-wider"
                    >
                      Submission Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-sm font-medium uppercase tracking-wider"
                    >
                      Responsiveness (/10)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-sm font-medium uppercase tracking-wider"
                    >
                      Styling (/10)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-sm font-medium uppercase tracking-wider"
                    >
                      Others (/10)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-sm font-medium uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-sm font-medium uppercase tracking-wider"
                    >
                      Feedback
                    </th>
                    {currentUser.role !== "STUDENT" && (
                      <th
                        scope="col"
                        className="px-6 py-3 text-sm font-medium uppercase tracking-wider"
                      >
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
                        <td className=" sticky left-0 bg-white divide-gray-200 ">
                          {submission.enrolledUser.username}
                        </td>
                        <td
                          className={`${
                            currentUser?.role === "STUDENT" && "hidden"
                          } px-6 py-4 whitespace-nowrap`}
                        >
                          <Link
                            href={`/playground/html-css-js?submissionId=${submission.id}`}
                            className="text-blue-400 font-semibold break-words"
                          >
                            view
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {submission.submissionDate
                            .toISOString()
                            .split("T")[0] || "NA"}
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
                              value={submission.feedback}
                              onChange={(e) => {
                                setFeedback(e.target.value);
                              }}
                              className="bg-transparent block min-w-16 text-start overflow-y-hidden border-black rounded-lg px-2 border-2 text-background m-2"
                            ></textarea>
                          ) : (
                            submission.overallFeedback || "NA"
                          )}
                        </td>
                        {currentUser.role !== "STUDENT" &&
                          (totalScore !== 0 ? (
                            <td className=" text-green-700 font-semibold">
                              <div className=" flex items-center justify-center">
                                Evaluated &nbsp; <FaCheck />
                              </div>
                            </td>
                          ) : (
                            <td className="px-6 py-4 whitespace-nowrap">
                              {editingIndex === index ? (
                                <div className="  flex items-center justify-center gap-5">
                                  <button
                                    onClick={() => {
                                      handleSave(index);
                                      handleFeedback(submission.id);
                                    }}
                                    className="text-blue-600 font-semibold hover:text-blue-700"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingIndex(-1)}
                                    className=" text-red-600 hover:text-red-700 font-semibold "
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    handleEdit(index, submission.id);
                                  }}
                                  className="text-blue-600 font-semibold"
                                >
                                  Edit
                                </button>
                              )}
                            </td>
                          ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="p-4 mt-6 font-semibold text-center">
            <Image
              src="https://i.postimg.cc/N0JMHNDw/undraw-Notify-re-65on-1-removebg-preview.png"
              height={300}
              className="m-auto"
              width={300}
              alt=""
            />
            <h1 className="text-white">No submissions yet!</h1>
          </div>
        )}
      </div>
    </div>
  );
}

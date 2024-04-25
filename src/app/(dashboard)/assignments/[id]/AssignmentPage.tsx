"use client";
import { useState } from "react";
import Link from "next/link";

export default function AssignmentPage({

  params,
  currentUser,
  assignment,
}: {
  params: { id: string };
  currentUser: any;
  assignment: any;
}) {
  const [editIndex, setEditIndex] = useState(-1);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedScores, setEditedScores] = useState({
    responsiveness: 0,
    styling: 0,
    other: 0,
  });

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    const submission = assignment?.submissions[index];
    const rValue = submission && submission.points.find((point: any) => point.category === "RESPOSIVENESS");
    const sValue = submission && submission.points.find((point: any) => point.category === "STYLING");
    const oValue = submission && submission.points.find((point: any) => point.category === "OTHER");
    setEditedScores({
      responsiveness: rValue ? rValue.score : 0,
      styling: sValue ? sValue.score : 0,
      other: oValue ? oValue.score : 0,
    });
  };

  const handleSave = (index: number) => {
    setEditingIndex(-1);
    console.log("Edited Scores for submission", index + 1, ":", editedScores);
  };

  const calculateTotalScore = () => {
    return assignment?.submissions.reduce((total: number, submission: any) => {
      const rValue = submission.points.find((point: any) => point.category === "RESPOSIVENESS")?.score || 0;
      const sValue = submission.points.find((point: any) => point.category === "STYLING")?.score || 0;
      const oValue = submission.points.find((point: any) => point.category === "OTHER")?.score || 0;
      return total + rValue + sValue + oValue;
    }, 0);
  };
  
  return (
    <div className="mx-2 md:mx-10 my-2 relative">
      <h1 className="text-center p-2 bg-gradient-to-l from-blue-500 to-blue-600 rounded text-sm md:text-lg font-medium">
        Assignment Submission : {assignment?.title}
      </h1>

      <div className="flex items-center justify-between my-4 text-xs md:text-sm font-medium">
        <p className="rounded p-1 px-2 bg-secondary-700">
          # {assignment?.class?.course?.title}
        </p>
        {assignment?.dueDate != null && (
          <div
            className={`p-1 px-2 rounded bg-secondary-700 ${new Date(assignment?.dueDate) > new Date()
                ? "bg-primary-600"
                : "bg-secondary-700"
              }`}
          >
            Last Date : {assignment?.dueDate.toISOString().split("T")[0]}
          </div>
        )}
      </div>

      <div className="border p-2 my-2 rounded">Details</div>
      <div className="my-8">
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

        <div>
          <Link
            hidden={
              currentUser?.role === "MENTOR" ||
              currentUser?.role === "INSTRUCTOR"
            }
            href={`/playground/html-css-js?assignmentId=${params.id}`}
          >
            {assignment?.submissions.length === 0 ? (
              <h1 className="bg-blue-600 inline p-2 text-sm rounded font-semibold">
                Submit through Playground
              </h1>
            ) : (
              <h1 className="bg-primary-600 p-2 text-sm rounded font-semibold">
                Submit another response
              </h1>
            )}
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-center">
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
                  className={`${currentUser?.role === "STUDENT"&&"hidden"} px-6 py-3 text-sm font-medium uppercase tracking-wider`}
                >
                  Submission Link
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-sm font-medium uppercase tracking-wider"
                >
                  Responsiveness
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-sm font-medium uppercase tracking-wider"
                >
                  Styling
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-sm font-medium uppercase tracking-wider"
                >
                  Others
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-sm font-medium uppercase tracking-wider"
                >
                  Total
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
                    <td className={`${currentUser?.role === "STUDENT"&&"hidden"} px-6 py-4 whitespace-nowrap`}>

                      <a
                        target="_blank"
                        href={submission.submissionLink}
                        className="text-blue-400 font-semibold break-words"
                      >
                        LINK
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <input
                          type="number"
                          value={editedScores.responsiveness}
                          onChange={(e) => {
                            const newScore = parseInt(e.target.value);
                            setEditedScores((prevScores) => ({
                              ...prevScores,
                              responsiveness: newScore,
                            }));
                            const newTotalScore = calculateTotalScore();
                            console.log("New Total Score:", newTotalScore);
                          }}
                          className="bg-transparent border-black rounded-lg px-2 border-2 text-background w-20"
                        />
                      ) : (
                        rValue?.score
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <input
                          type="number"
                          value={editedScores.styling}
                          onChange={(e) => {
                            const newScore = parseInt(e.target.value);
                            setEditedScores((prevScores) => ({
                              ...prevScores,
                              styling: newScore,
                            }));
                          }}
                          className="bg-transparent border-black rounded-lg px-2 border-2 text-background w-20"
                        />
                      ) : (
                        sValue?.score
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <input
                          type="number"
                          value={editedScores.other}
                          onChange={(e) => {
                            const newScore = parseInt(e.target.value);
                            setEditedScores((prevScores) => ({
                              ...prevScores,
                              other: newScore,
                            }));
                          }}
                          className="bg-transparent border-black rounded-lg px-2 border-2 text-background w-20"
                        />
                      ) : (
                        oValue?.score
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {totalScore}
                    </td>
                    {currentUser.role !== "STUDENT" && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingIndex === index ? (
                          <button
                            onClick={() => handleSave(index)}
                            className="text-blue-600 font-semibold"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setEditIndex(index);
                              handleEdit(index);
                            }}
                            className="text-blue-600 font-semibold"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

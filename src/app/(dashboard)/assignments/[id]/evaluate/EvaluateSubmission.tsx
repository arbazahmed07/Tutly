"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";

const EvaluateSubmission = ({
  submission
}: {
  submission: any
}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedScores, setEditedScores] = useState({
    responsiveness: 0,
    styling: 0,
    other: 0,
  });
  const [feedback, setFeedback] = useState<string | null>(null);

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

  const handleFeedback = async (submissionId: string) => {
    try {
      if (!feedback) return
      const res = await axios.post("/api/feedback", {
        submissionId: submissionId,
        feedback: feedback,
      });
      toast.success("Feedback saved successfully");
    } catch (e: any) {
      toast.error("Failed to save feedback");
    }
  }

  const handleEdit = () => {
    setIsEditing(true);
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
  };

  const router = useRouter()


  const handleSave = async () => {
    try {
      toast.loading("Updating Scores...");

      const res = await axios.post("/api/points", {
        submissionId: submission.id,
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
      handleFeedback(submission.id);
      setIsEditing(false);
      toast.dismiss();
      toast.success("Scores saved successfully");
      router.refresh();
    } catch (e: any) {
      toast.dismiss();
      toast.error("Failed to save scores");
    } finally {
      setIsEditing(false);
      router.refresh()
    }
  };

  const handleDelete = async () => {
    const response = confirm("Are you sure you want to delete this submission?");
    if (!response) return;
    try {
      toast.loading("Deleting Submission...");
      const res = await axios.delete(`/api/submissions/${submission.id}`);
      toast.dismiss();
      toast.success("Submission deleted successfully");
      router.refresh()
    } catch (e: any) {
      toast.dismiss();
      toast.error("Failed to delete submission");
    }
  }

  return (
    <div>
      <table className="text-center w-full text-black">
        <thead className="bg-secondary-300 text-secondary-700 sticky top-0">
          <tr>
            <th className="px-2 py-1 text-xs font-medium uppercase sticky left-0 text-secondary-700 bg-secondary-300 ">
              username
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-xs font-medium uppercase">
              Submission Link
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-xs font-medium uppercase"
            >
              Submission Date
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-xs font-medium uppercase"
            >
              Responsiveness (/10)
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-xs font-medium uppercase"
            >
              Styling (/10)
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-xs font-medium uppercase"
            >
              Others (/10)
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-xs font-medium uppercase"
            >
              Total
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-xs font-medium uppercase"
            >
              Feedback
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-xs font-medium uppercase"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white text-xs divide-y divide-gray-200">
          {
            <tr>
              <td className=" sticky left-0 bg-white divide-gray-200 ">{submission.enrolledUser.username}</td>
              <td
                className="px-2 py-1 whitespace-nowrap">
                <a
                  target="_blank"
                  href={submission.submissionLink}
                  className="text-blue-400 font-semibold break-words"
                >
                  LINK
                </a>
              </td>
              <td className="px-2 py-1 whitespace-nowrap">
                {submission.submissionDate
                  .toISOString()
                  .split("T")[0] || "NA"}
              </td>
              <td className="px-2 py-1 whitespace-nowrap">
                {isEditing ? (
                  <input
                    title="null"
                    type="number"
                    value={editedScores.responsiveness}
                    onChange={(e) => {
                      const newScore = parseInt(e.target.value);
                      if (!isNaN(newScore) && newScore >= 0 && newScore <= 10) {
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
              <td className="px-2 py-1 whitespace-nowrap">
                {isEditing ? (
                  <input
                    title="null"
                    type="number"
                    value={editedScores.styling}
                    onChange={(e) => {
                      const newScore = parseInt(e.target.value);
                      if (!isNaN(newScore) && newScore >= 0 && newScore <= 10) {
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
              <td className="px-2 py-1 whitespace-nowrap">
                {isEditing ? (
                  <input
                    title="null"
                    type="number"
                    value={editedScores.other}
                    onChange={(e) => {
                      const newScore = parseInt(e.target.value);
                      if (!isNaN(newScore) && newScore >= 0 && newScore <= 10) {
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
              <td className="px-2 py-1 whitespace-nowrap">
                {rValue?.score || sValue?.score || oValue?.score
                  ? totalScore
                  : "NA"}
              </td>
              <td>
                {
                  isEditing ? (
                    <textarea
                      title="null"
                      value={submission.feedback}
                      onChange={(e) => {
                        setFeedback(e.target.value);
                      }}
                      className="bg-transparent block min-w-16 text-start overflow-y-hidden border-black rounded-lg px-2 border-2 text-background m-2"
                    >
                    </textarea>
                  ) : (
                    submission.overallFeedback || "NA"
                  )
                }
              </td>
              {
                totalScore !== 0 ?
                  <td className=" text-green-700 font-semibold">
                    <div className=" flex items-center justify-center">
                      Evaluated &nbsp; <FaCheck />
                    </div>
                  </td>
                  :
                  <td className="px-2 py-1 whitespace-nowrap">
                    {isEditing ? (
                      <div className="flex items-center justify-center gap-5">
                        <button
                          onClick={handleSave}
                          className="text-blue-600 font-semibold hover:text-blue-700"
                        >
                          Save
                        </button>
                        <button onClick={() => setIsEditing(false)} className=" text-red-600 hover:text-red-700 font-semibold ">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-5">
                        <button
                          onClick={handleEdit}
                          className="text-blue-600 font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={handleDelete}
                          className="text-red-600 hover:text-red-700 font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
              }
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default EvaluateSubmission
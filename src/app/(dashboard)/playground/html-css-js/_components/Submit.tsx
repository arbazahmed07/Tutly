"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import axios from "axios";
import usePlaygroundContext from "@/hooks/usePlaygroundContext";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";
import { IoWarningOutline } from "react-icons/io5";

const Submit = ({
  user,
  assignmentDetails,
  mentorDetails,
  isLoading,
}: {
  user: any;
  assignmentDetails: any;
  mentorDetails: any;
  isLoading?: boolean;
}) => {
  const [confetti, setConfetti] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("Submit");
  const [openPopup, setOpenPopup] = useState(false);
  const { files } = usePlaygroundContext();

  const router = useRouter();

  const handleSubmit = async () => {
    if (
      !user ||
      !user.username ||
      !user.email ||
      !assignmentDetails ||
      !assignmentDetails.title
    ) {
      console.log(user, user.username, user.email, assignmentDetails, assignmentDetails.title);
      toast.error("Error submitting assignment");
      return;
    }

    try {
      const maxSubmissions = assignmentDetails.maxSubmissions;
      if(maxSubmissions<=assignmentDetails.submissions.length) {
        toast.error("Assignment has reached maximum number of submissions");
        return;
      }
      setSubmitting(true);
      toast.loading("Submitting assignment");

      const filePaths: string[] = [];
      const newFiles: { [key: string]: string } = {};

      files.forEach((file, index) => {
        if(maxSubmissions > 1){
          const filePath = `${assignmentDetails.class.course.title}/mentor-${mentorDetails.mentor.username}/assignments/${user.username}/${assignmentDetails.title}.${assignmentDetails.submissions.length + 1}/${file.filePath}`;
          filePaths.push(filePath);
          newFiles[filePath] = file.code;
        } else {
          const filePath = `${assignmentDetails.class.course.title}/mentor-${mentorDetails.mentor.username}/assignments/${user.username}/${assignmentDetails.title}/${file.filePath}`;
          filePaths.push(filePath);
          newFiles[filePath] = file.code;
        }
      });
      const submission = await axios.post(`/api/assignment/submit`, {
        assignmentDetails,
        files: newFiles,
        mentorDetails,
      });
      toast.dismiss();
      setConfetti(true);
      setTimeout(() => setConfetti(false), 5000);
      toast.success("Assignment submitted successfully");
      setStatus("Submitted");
      router.back();
    } catch (e) {
      toast.dismiss();
      toast.error("Error submitting assignment");
    } finally {
      setSubmitting(false);
      setOpenPopup(false);
    }
  };
  // return <pre>{JSON.stringify(user, null, 2)}</pre>  
  return (
    <div>
      <div>
        <button
          onClick={() => setOpenPopup(!openPopup)}
          className="rounded border p-1 px-4 hover:bg-white hover:text-black"
          disabled={isSubmitting || status === "Submitted"}
        >
          {status}
        </button>
      </div>
      <div>
        {confetti && (
          <Confetti
            width={1600}
            height={window.innerHeight || 1000}
            numberOfPieces={400}
            friction={0.99}
            colors={[
              "#ff0000",
              "#00ff00",
              "#0000ff",
              "#ffff00",
              "#ff00ff",
              "#00ffff",
            ]}
          />
        )}
      </div>
      <div
        className={`fixed inset-0 flex items-center justify-center h-screen w-screen ${
          openPopup ? "bg-black bg-opacity-50" : "hidden"
        } transition-opacity duration-300`}
      >
        <div
          className={`bg-background rounded-lg p-8 w-[500px] ${
            openPopup ? "scale-100" : "scale-0"
          } transform transition-transform duration-300`}
        >
          <h1 className="text-xl font-semibold mb-4">Confirm Submission</h1>
          <p className="mb-2">
            Are you sure you want to submit the 
            <a href={`${assignmentDetails.link}`} target="_blank" className="text-blue-500">
            &nbsp;{assignmentDetails.title}
            </a> ?
          </p>
          <p className="text-sm text-gray-500 mb-6 flex items-center gap-1">
            <IoWarningOutline className="text-md"/> Once submitted, you cannot edit your code.
          </p>
          <div className="flex justify-end">
            <Button
              onClick={() => setOpenPopup(false)}
              className="mr-2 bg-gray-200 hover:bg-gray-300 text-black"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading || isSubmitting || status === "Submitted"}
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleSubmit}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submit;

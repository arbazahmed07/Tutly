"use client";
import { useState } from "react";
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import axios from "axios";
import usePlaygroundContext from "@/hooks/usePlaygroundContext";
import Confetti from 'react-confetti'

const Submit = ({
  user,
  assignmentDetails,
  mentorDetails,
  isLoading,
}: {
  user: any,
  assignmentDetails: any,
  mentorDetails: any,
  isLoading?: boolean
}) => {
  const [confetti,setConfetti]=useState(false)
  const [isSubmitting, setSubmitting] = useState(false);
  const { files } = usePlaygroundContext();

  const handleSubmit = async () => {
    if (!user || !user.username || !user.email || !assignmentDetails || !assignmentDetails.title) {
      toast.error('Error submitting assignment');
      return;
    }
    
    try {
      if(assignmentDetails.maxSubmissions<=assignmentDetails.submissions.length) {
        toast.error("Assignment has reached maximum number of submissions");
        return;
      }
      setSubmitting(true);
      toast.loading('Submitting assignment');

      const filePaths: string[] = [];
      const newFiles: { [key: string]: string } = {};

      files.forEach((file, index) => {
        const filePath = `${assignmentDetails.class.course.title}/mentor-${mentorDetails.mentor.username}/assignments/${user.username}/${assignmentDetails.title}/${file.filePath}`;
        filePaths.push(filePath);
        newFiles[filePath] = file.code;
      });
      const submission = await axios.post(`/api/assignment/submit`, {
        assignmentDetails,
        files:newFiles,
        mentorDetails,
      });
      toast.dismiss();
      setConfetti(true)
      setTimeout(() => setConfetti(false),5000)
      toast.success('Assignment submitted successfully');
    } catch (e) {
      toast.dismiss();
      toast.error('Error submitting assignment');
    } finally {
      setSubmitting(false);
    }
  }
  // return <pre className="text-red-900">{JSON.stringify(assignmentDetails, null, 2)}</pre>
  return (
    <div>
      <Button disabled={isLoading || isSubmitting} className="w-full" variant="outline" onClick={handleSubmit} >
        Submit
      </Button>
        <div>
          {confetti && (<Confetti width={1600} height={window.innerHeight || 1000} numberOfPieces={400}
            friction={0.99}
            colors={['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']}/>
          )}
        </div>
    </div>
  );
};

export default Submit;

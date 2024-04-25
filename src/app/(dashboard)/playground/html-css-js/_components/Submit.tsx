"use client"


import { useContext, useState } from "react";
import toast from 'react-hot-toast';
import { Context } from "./context";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Submit = ({
  user,
  assignmentDetails,
  isLoading,
}: {
  user: any,
  assignmentDetails: any,
  isLoading?: boolean
}) => {

  const [isSubmitting, setSubmitting] = useState(false);
  const { state } = useContext(Context);

  const handleSubmit = async () => {

    if (!user || !user.username || !user.email || !assignmentDetails || !assignmentDetails.title) {
      toast.error('Error submitting assignment');
      return;
    }

    const filePaths = [
      `assignments/${user.username}/${assignmentDetails.title}/index.html`,
      `assignments/${user.username}/${assignmentDetails.title}/index.css`,
      `assignments/${user.username}/${assignmentDetails.title}/index.js`,
    ];

    const files = {
      [filePaths[0]]: state.html,
      [filePaths[1]]: state.css,
      [filePaths[2]]: state.js,
    };
    try {
      setSubmitting(true);
        toast.loading('Submitting assignment');
        const submission = await axios.post(`/api/assignment/submit`, {
          assignmentDetails,
          files,
        });
      toast.dismiss();
      toast.success('Assignment submitted successfully');
    } catch (e) {
      toast.dismiss();
      toast.error('Error submitting assignment');
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <Button disabled={isLoading || isSubmitting} className="w-full" variant="outline" onClick={handleSubmit} >
      Submit
    </Button>
  )
}

export default Submit
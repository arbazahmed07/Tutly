"use client";

import Submit from "@/app/(dashboard)/playgrounds/_components/Submit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SubmitAssignment = ({
  currentUser,
  assignmentId,
}: {
  currentUser: any;
  assignmentId: string;
}) => {
  const [assignmentDetails, setAssignmentDetails] = useState<any>(null);
  const [mentorDetails, setMentorDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!assignmentId) return;
    async function fetch() {
      setIsLoading(true);
      async function fetchData() {
        const { data } = await axios.get(`/api/attachments/${assignmentId}`);
        setAssignmentDetails(data.assignment);
        setMentorDetails(data.mentorDetails);
        return data;
      }
      const data: any = await fetchData();
      if (!data.assignment || !currentUser) {
        toast.error("Error fetching assignment details");
      }
      setIsLoading(false);
    }
    fetch();
  }, [assignmentId]);

  return (
    assignmentId &&
    (assignmentDetails ? (
      <Submit
        user={currentUser}
        mentorDetails={mentorDetails}
        assignmentDetails={assignmentDetails}
        isLoading={isLoading}
      />
    ) : (
      <h1 className="text-2xl font-bold">Loading...</h1>
    ))
  );
};

export default SubmitAssignment;

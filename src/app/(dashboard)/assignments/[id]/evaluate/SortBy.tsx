"use client";

import { useRouter } from "next/navigation";
import React from "react";

const SortBy = ({
  assignmentId,
  searchParams,
}: {
  assignmentId: string;
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const router = useRouter();
  return (
    <>
      <div className="flex border-b p-1 sm:p-2">
        <p className="text-nowrap text-sm font-semibold max-sm:hidden">
          Sort by
        </p>
        <select
          className="sm:ml-2"
          onChange={(e) => {
            const sortBy = e.target.value;
            const newSearchParams = { ...searchParams, sortBy };
            router.push(
              `/assignments/${assignmentId}/evaluate?${new URLSearchParams(newSearchParams).toString()}`,
            );
          }}
          value={searchParams?.sortBy || "username"}
        >
          <option value="username">Username</option>
          <option value="submissionDate">Submission Date</option>
          <option value="points">Points</option>
          <option value="submissionIndex">Submission Index</option>
          <option value="submissionCount">Submission Count</option>
        </select>
      </div>
    </>
  );
};

export default SortBy;

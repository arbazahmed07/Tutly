"use client";

import { type Attachment } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

const FilterBy = ({
  assignments,
  searchParams,
}: {
  assignments: Attachment[];
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const router = useRouter();
  return (
    <>
      <div className="flex border-b p-1 sm:p-2">
        <p className="text-nowrap text-sm font-semibold max-sm:hidden">
          Filter by
        </p>
        <select
          className="sm:ml-2"
          onChange={(e) => {
            const assignmentId = e.target.value;
            const newSearchParams = { ...searchParams, assignmentId };
            router.push(
              `/assignments/evaluate?${new URLSearchParams(newSearchParams).toString()}`
            );
          }}
          value={searchParams?.assignmentId ?? ""}
        >
          <option value="">All Assignments</option>
          {assignments.map((assignment) => (
            <option key={assignment.id} value={assignment.id}>
              {/* @ts-ignore */}
              {assignment.title} - {assignment?.course?.title}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default FilterBy;

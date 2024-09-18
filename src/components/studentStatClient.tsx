"use client";

import { useState, useEffect } from "react";
import DoughnutChart from "@/components/charts/doughnut";
import CalendarHeatmap from "@/components/charts/heatmap";
import { FaRankingStar } from "react-icons/fa6";
import Barchart from "@/components/charts/barchart";
import Linechart from "@/components/charts/linechart";
import { getAttendanceOfStudent } from "@/actions/attendance";

interface StudentStatClientProps {
  studentId: string;
  courseId: string;
}

export default function StudentStatClient({
  studentId,
  courseId,
}: StudentStatClientProps) {
  const [assignments, setAssignments] = useState<string[]>([]);
  const [countForEachAssignment, setCountForEachAssignment] = useState<
    number[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      const { classes, attendanceDates } = await getAttendanceOfStudent(
        studentId,
        courseId,
      );
      setAssignments(classes);
      setCountForEachAssignment(
        attendanceDates.map((date) => classes.indexOf(date)),
      );
    }

    fetchData();
  }, [studentId, courseId]);

  return (
    <div>
      <h1>Student Statistics</h1>
      <Linechart
        assignments={assignments}
        countForEachAssignment={countForEachAssignment}
      />
    </div>
  );
}

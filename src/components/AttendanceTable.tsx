"use client";
import Image from "next/image";
import { useState } from "react";

export default function AttendanceTable({
  studentsAttendance,
}: {
  studentsAttendance: any;
}) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  }>({
    key: "-1",
    direction: "ascending",
  });

  const sortedData = [...studentsAttendance].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="container mx-auto px-4 pt-8 lg:px-20">
      <h1
        className="mb-4 cursor-pointer text-end text-xl font-bold text-primary-500"
        onClick={() => setSortConfig({ key: "-1", direction: "ascending" })}
      >
        Overall Attendance
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-blue-600">
              <th className="cursor-pointer border p-2">S.No</th>
              <th className="cursor-pointer border p-2">Name</th>
              <th
                className="cursor-pointer border p-2"
                onClick={() => handleSort("username")}
              >
                Roll Number{" "}
                {sortConfig.key === "username"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th
                className="cursor-pointer border p-2"
                onClick={() => handleSort("percentage")}
              >
                Percentage{" "}
                {sortConfig.key === "percentage"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item: any, index: number) => (
              <tr key={item.username} className="border-b">
                <td className="border-x border-y-0 p-0 text-center">
                  {index + 1}
                </td>
                <td className="flex items-center justify-start gap-5 space-x-4 border-y-0 p-2">
                  <Image
                    unoptimized
                    src={
                      item.image || "https://i.postimg.cc/zXj77wQG/image.png"
                    }
                    width={40}
                    height={40}
                    alt="profile image"
                    className="rounded-full"
                  />
                  {item.name}
                </td>
                <td className="border p-2 text-center">{item.username}</td>
                <td
                  className={`border p-2 text-center ${item.percentage < 75 ? "text-red-500" : "text-green-500"}`}
                >
                  {Math.round(item.percentage)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

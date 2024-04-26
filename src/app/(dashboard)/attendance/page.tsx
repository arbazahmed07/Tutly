"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import _ from "lodash";
import toast from "react-hot-toast";

const AttendancePage = () => {
  const [fileData, setFileData] = useState<any>([]);
  const [selectedFile, setSelectedFile] = useState<any>();
  const students = [
    {
      "Name": "23071A67H4 (RIDA ALMAS MUJAHID)",
      "JoinTime": "04/26/2024 06:37:06 PM",
      "LeaveTime": "04/26/2024 08:26:28 PM",
      "Duration": 110,
    },
    // Add more sample data if needed
  ];

  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleClosePopup = () => {
    setSelectedStudent(null);
  };

  const onSelectFile = (file: Blob) => {
    setSelectedFile(file);
    try {
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = (e.target as FileReader).result;
        const workbook = XLSX.read(result, {
          type: "binary",
          cellDates: true,
        });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        //converts the date to string
        data.forEach((row: any) => {
          _.forIn(row, (value: any, key) => {
            if (value instanceof Date) {
              row[key] = value.toISOString().split("T")[0];
            }
          });
        });
        console.log(data);
        console.log(file);

        setFileData(data);
      };
      reader.onerror = () => {
        throw new Error("Error in reading file");
      };

      reader.readAsBinaryString(file);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  // Step 1: Aggregate attendance details for students with the same first 10 characters of their names
  const aggregatedStudents = fileData.reduce((acc, student) => {
    const firstTenCharsName = String(student.Name).substring(0, 10);
    if (!acc[firstTenCharsName]) {
      acc[firstTenCharsName] = {
        Name: student.Name,
        Joins: [
          {
            JoinTime: student.JoinTime,
            LeaveTime: student.LeaveTime,
            ActualName: student.Name,
            Duration: parseInt(student.Duration),
          },
        ],
        Duration: parseInt(student.Duration),
      };
    } else {
      acc[firstTenCharsName].Joins.push({
        JoinTime: student.JoinTime,
        LeaveTime: student.LeaveTime,
        ActualName: student.Name,
        Duration: parseInt(student.Duration),
      });
      acc[firstTenCharsName].Duration += parseInt(student.Duration);
    }
    return acc;
  }, {});

  // Sort aggregated students by name
  const sortedAggregatedStudents = Object.values(aggregatedStudents).sort((a, b) => {
    const nameA = String(a.Name).toUpperCase();
    const nameB = String(b.Name).toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="p-4 text-center ">
      <input
        type="file"
        accept=".csv, .xlsx"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            onSelectFile(files[0]);
          }
        }}
      />
      {selectedFile && (
        <p className="text-sm text-gray-700">
          {selectedFile.name} - {(selectedFile.size / 1024).toFixed(2)} KB
        </p>
      )}
      <div className="">
        <h1 className="text-4xl mt-4 font-semibold mb-4">Attendance Page</h1>
      </div>
      <p className="text-lg">Monitor your mentees attendance here</p>
      <table className="w-[80%] m-auto mt-10">
        <thead>
          <tr className="border-b">
            <th>index</th>
            <th className="py-2">Name</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Times Joined</th>
          </tr>
        </thead>
        <tbody>
          {sortedAggregatedStudents.map((student:any, index) => (
            <tr key={index} onClick={() => handleStudentClick(student)}>
              <td>{index+1}</td>
              <td className="py-2 cursor-pointer">
                {String(student?.Name).substring(0, 10).toUpperCase()}
              </td>
              <td>{student.Duration}</td>
              <td>{student.Joins[0].JoinTime.split(" ")[0]}</td>
              <td>{student.Joins.length}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStudent && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white text-gray-700 p-4 rounded-md w-[60%]">
            <h2 className="text-lg font-semibold mb-2">
              Attendance Details for {selectedStudent.Name as string}
            </h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Actual Name</th>
                  <th className="border px-4 py-2">Join Time</th>
                  <th className="border px-4 py-2">Leave Time</th>
                  <th className="border px-4 py-2">Duration</th>
                </tr>
              </thead>
              <tbody>
                {selectedStudent?.Joins.map((join:any, index:number) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{join.ActualName}</td>
                    <td className="border px-4 py-2">{join.JoinTime}</td>
                    <td className="border px-4 py-2">{join.LeaveTime}</td>
                    <td className="border px-4 py-2">{join.Duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendancePage;

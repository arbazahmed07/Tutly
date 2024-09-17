"use client";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import _ from "lodash";
import toast from "react-hot-toast";
import axios from "axios";
import AttendanceHeader from "./AttendanceHeader";
import OverallAttendanceTable from "./AttendanceTable";

interface Student {
  Name: string;
  username: string;
  JoinTime: string;
  LeaveTime: string;
  Duration: string;
  UserEmail: string;
  RecordingDisclaimerResponse: string;
  InWaitingRoom: string;
}

const AttendanceClient = ({ courses, role, attendance }: any) => {
  const [fileData, setFileData] = useState<any>([]);
  const [selectedFile, setSelectedFile] = useState<any>();
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  const [currentClass, setCurrentClass] = useState<any>(null);
  const [openCourses, setOpenCourses] = useState<boolean>(false);
  const [openClasses, setOpenClasses] = useState<boolean>(false);
  const [users, setUsers] = useState<any>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  useEffect(() => {
    if (!currentCourse) {
      return;
    }
    const fetch = async () => {
      const res = await axios.post("/api/course/students", {
        courseId: currentCourse.id,
      });
      setUsers(res.data);
    };
    fetch();
  }, [currentCourse]);

  const handleStudentClick = (student: any) => {
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
        const result = e.target!.result;
        const workbook = XLSX.read(result, {
          type: "binary",
          cellDates: true,
        });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];

        const data = XLSX.utils.sheet_to_json(worksheet, {
          defval: "",
          range: { s: { c: 0, r: 3 }, e: { c: 6, r: 10000 } },
        });

        const modifiedData = data.map((row: any) => ({
          Name: row["Name (Original Name)"],
          username: String(row["Name (Original Name)"])
            .substring(0, 10)
            .toUpperCase(),
          JoinTime: row["Join Time"],
          LeaveTime: row["Leave Time"],
          Duration: row["Duration (Minutes)"],
          UserEmail: row["User Email"],
          RecordingDisclaimerResponse: row["Recording Disclaimer Response"],
          InWaitingRoom: row["In Waiting Room"],
        }));
        setFileData(modifiedData);
      };
      reader.onerror = () => {
        throw new Error("Error in reading file");
      };

      reader.readAsText(file);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const aggregatedStudents = fileData.reduce((acc: any, student: Student) => {
    const { username } = student;
    if (!acc[username]) {
      acc[username] = {
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
        username: student.username,
      };
    } else {
      acc[username].Joins.push({
        JoinTime: student.JoinTime,
        LeaveTime: student.LeaveTime,
        ActualName: student.Name,
        Duration: parseInt(student.Duration),
      });
      acc[username].Duration += parseInt(student.Duration);
    }
    return acc;
  }, {});

  const sortedAggregatedStudents = Object.values(aggregatedStudents).sort(
    (a: any, b: any) => {
      const usernameA = String(a.username).toUpperCase();
      const usernameB = String(b.username).toUpperCase();
      if (usernameA < usernameB) {
        return -1;
      }
      if (usernameA > usernameB) {
        return 1;
      }
      return 0;
    },
  );

  const modifiedAggregatedStudents = sortedAggregatedStudents.map(
    (student: any) => {
      const matchedUser = users.find(
        (user: any) => user.username === student.username,
      );
      if (matchedUser) {
        return {
          ...student,
          Present: true,
          username: matchedUser.username,
          ActualName: matchedUser.name,
        };
      } else {
        return {
          ...student,
          Present: false,
          username: student.username || "",
          ActualName: student.Name || "",
        };
      }
    },
  );

  // Separate present and absent students
  const combinedStudents = modifiedAggregatedStudents.map((student: any) => ({
    ...student,
    Name: student.ActualName,
    username: student.username,
  }));

  const presentStudents = combinedStudents.filter(
    (student: any) => student.Present,
  );
  const absentStudents = combinedStudents.filter(
    (student: any) => !student.Present,
  );

  // edit student join name
  const [username, setUsername] = useState<string>("");
  const [openEditName, setOpenEditName] = useState<number>(0);
  const handleEditUsername = (from: any, to: any) => {
    fileData.map((student: any) => {
      student.username = student.username.replace(from, to);
    });
  };

  const [maxInstructionDuration, setMaxInstructionDuration] = useState(0);

  // upload attendance to db
  const handleUpload = async () => {
    toast.loading("uploading attendance...");
    try {
      const res = await axios.post("/api/attendance", {
        classId: currentClass?.id,
        data: presentStudents,
        maxInstructionDuration,
      });
      toast.dismiss();

      toast.success("Attendance uploaded successfully");
    } catch (e) {
      toast.error("Attendance already uploaded!");
    }
  };
  const [pastpresentStudents, setPastPresentStudents] = useState([]);
  const [present, setPresent] = useState(0);

  const [studentsAttendance, setStudentsAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStudentsAttendance = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/attendance/getTotalAttendance");

      setStudentsAttendance(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentsAttendance();
  }, []);

  useEffect(() => {
    const viewAttendance = async () => {
      if (currentClass) {
        const res = await axios.get(`/api/attendance/${currentClass.id}`);
        setPastPresentStudents(res.data.attendance);
        setPresent(res.data.present);
        const Totaldata: any = [];

        res.data.attendance.forEach((student: any) => {
          const { username, data } = student;
          data.forEach((join: any) => {
            Totaldata.push({
              Name: join.ActualName,
              username: username,
              JoinTime: join.JoinTime,
              LeaveTime: join.LeaveTime,
              Duration: join.Duration,
              UserEmail: student.UserEmail,
              RecordingDisclaimerResponse: student.RecordingDisclaimerResponse,
              InWaitingRoom: student.InWaitingRoom,
            });
          });
        });
        setFileData(Totaldata);
      }
    };
    viewAttendance();
  }, [currentClass]);

  return (
    <div className="p-4 text-center">
      <div>
        <h1 className="mx-auto mb-2 mt-4 w-60 bg-gradient-to-r from-green-400 via-orange-200 to-red-400 bg-clip-text text-4xl font-black text-transparent">
          Attendance
        </h1>
      </div>
      <h1 className="text-md text-center font-semibold text-secondary-400">
        {" "}
        ~ Mark and Monitor Students Attendance
      </h1>
      <AttendanceHeader
        role={role}
        pastpresentStudents={pastpresentStudents}
        courses={courses}
        currentCourse={currentCourse}
        setCurrentCourse={setCurrentCourse}
        currentClass={currentClass}
        setCurrentClass={setCurrentClass}
        openClasses={openClasses}
        openCourses={openCourses}
        setOpenClasses={setOpenClasses}
        setOpenCourses={setOpenCourses}
        onSelectFile={onSelectFile}
        fileData={fileData}
        selectedFile={selectedFile}
        handleUpload={handleUpload}
        count={[
          present,
          users.length - present,
          pastpresentStudents.length - present,
        ]}
        maxInstructionDuration={maxInstructionDuration}
        setMaxInstructionDuration={setMaxInstructionDuration}
      />

      {/* Table */}
      {fileData && selectedFile && pastpresentStudents.length == 0 && (
        <AttendanceTable
          presentStudents={presentStudents}
          users={users}
          absentStudents={absentStudents}
          handleStudentClick={handleStudentClick}
          openEditName={openEditName}
          setOpenEditName={setOpenEditName}
          username={username}
          setUsername={setUsername}
          handleEditUsername={handleEditUsername}
        />
      )}

      {pastpresentStudents.length > 0 && (
        <AttendanceTable
          presentStudents={presentStudents}
          users={users}
          absentStudents={absentStudents}
          handleStudentClick={handleStudentClick}
          openEditName={openEditName}
          setOpenEditName={setOpenEditName}
          username={username}
          setUsername={setUsername}
          handleEditUsername={handleEditUsername}
        />
      )}

      {!currentClass && (
        <OverallAttendanceTable studentsAttendance={attendance} />
      )}

      {selectedStudent && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-3/5 rounded-md bg-white p-4 text-gray-700">
            <h2 className="mb-2 text-lg font-semibold">
              Attendance Details for {String(selectedStudent?.Name)}
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
                {selectedStudent.Joins?.map((join: any, index: number) => (
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
              className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
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

export default AttendanceClient;

const AttendanceTable = ({
  presentStudents,
  users,
  absentStudents,
  handleStudentClick,
  openEditName,
  setOpenEditName,
  username,
  setUsername,
  handleEditUsername,
}: any) => {
  let k = 0;

  return (
    <>
      <table className="m-auto mt-10 w-4/5 border">
        <thead>
          <tr className="border-b bg-blue-600">
            <th>S.No</th>
            <th className="border-x py-2 pl-10 text-start">Name</th>
            <th className="border-x">Username</th>
            <th className="border-x">Duration</th>
            <th className="border-x">Date</th>
            <th className="border-x">Times Joined</th>
            <th className="border-x">View</th>
          </tr>
        </thead>
        <tbody>
          {presentStudents.map((student: any, index: number) => {
            return (
              <tr
                key={index}
                className="cursor-pointer border-b hover:bg-primary-800"
              >
                <td className="border-x">{index + 1}</td>
                <td className="border-x py-2 pl-10 text-start">
                  {student.ActualName}
                </td>
                <td className="border-x">{student.username}</td>
                <td className="border-x">
                  <p
                    className={`m-auto w-10 rounded p-1 ${
                      student.Duration < 30
                        ? "bg-red-500"
                        : student.Duration < 90
                          ? "bg-blue-500"
                          : "bg-green-500"
                    }`}
                  >
                    {student.Duration}
                  </p>
                </td>
                <td className="border-x">
                  {student.Joins[0].JoinTime.split(" ")[0]}
                </td>
                <td className="border-x">{student.Joins.length}</td>
                <td
                  className="cursor-pointer border-x"
                  onClick={() => handleStudentClick(student)}
                >
                  view
                </td>
              </tr>
            );
          })}
          {users.map((student: any, index: number) => {
            const userInPresentStudents = presentStudents.find(
              (x: any) => x.username === student.username,
            );
            if (!userInPresentStudents) {
              k += 1;
              return (
                <tr key={index} className="hover:bg-primary-800">
                  <td>{k + presentStudents.length}</td>
                  <td className="py-2 pl-10 text-start">{student.name}</td>
                  <td>{student.username}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td
                    className="cursor-pointer"
                    onClick={() => handleStudentClick(student)}
                  >
                    view
                  </td>
                  {/* <td>
                        <select>
                          <option value="absent">A</option>
                          <option value="present">P</option>
                        </select>
                      </td> */}
                </tr>
              );
            }
          })}
        </tbody>
      </table>

      {/* Absent Students Table */}
      {absentStudents.length > 0 && (
        <table className="m-auto mt-10 w-4/5">
          <thead>
            <tr className="border-b">
              <th>index</th>
              <th className="max-w-52 text-pretty py-2 pl-10 text-start">
                Joined Name
              </th>
              <th className="py-2">username</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Times Joined</th>
              <th>view</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {absentStudents.map(
              (
                student: {
                  Name: string;
                  Joins: {
                    ActualName: string;
                    JoinTime: string;
                    Duration: number;
                  }[];
                  Duration: number;
                  username: string;
                },
                index: number,
              ) => (
                <tr key={index} className="hover:bg-primary-800">
                  <td>{index + 1}</td>
                  <td className="ps-8 text-start">
                    {student.Joins[0].ActualName}
                  </td>
                  {openEditName === Number(index + 1) ? (
                    <td className="max-w-52 py-2 pl-10 text-start">
                      <input
                        className="block"
                        onChange={(e) => setUsername(e.target.value)}
                        defaultValue={student.username}
                      />
                    </td>
                  ) : (
                    <td className="max-w-52 py-2 pl-10 text-start">
                      {student.username}
                    </td>
                  )}
                  <td>
                    <p
                      className={`m-auto w-10 rounded p-1 ${
                        student.Duration < 30
                          ? "bg-red-500"
                          : student.Duration < 90
                            ? "bg-blue-500"
                            : "bg-green-500"
                      }`}
                    >
                      {student.Duration}
                    </p>
                  </td>
                  <td>{String(student.Joins[0].JoinTime).split(" ")[0]}</td>
                  <td>{student.Joins.length}</td>

                  <td
                    className="cursor-pointer"
                    onClick={() => handleStudentClick(student)}
                  >
                    view
                  </td>
                  {openEditName !== index + 1 ? (
                    <td
                      className="cursor-pointer hover:bg-red-400"
                      onClick={
                        openEditName === 0
                          ? () => setOpenEditName(index + 1)
                          : () => setOpenEditName(0)
                      }
                    >
                      edit
                    </td>
                  ) : (
                    <td
                      onClick={() => {
                        setOpenEditName(0);
                        handleEditUsername(student.username, username);
                      }}
                      className="cursor-pointer hover:bg-red-400"
                    >
                      save
                    </td>
                  )}
                </tr>
              ),
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

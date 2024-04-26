import { pastMeetingParticipantsReport } from "@/app/zoom/zoomReportHelper";
import React from "react";

const AttendancePage = async () => {
  const students = [
    {
      "Name":"23071A67H4 (RIDA ALMAS MUJAHID)",
      
      "JoinTime":"04/26/2024 06:37:06 PM",
      "Leave Time":"04/26/2024 08:26:28 PM",
      "Duration":"110"
    },
    {
      "Name":"23071A6769",
      "JoinTime":"04/26/2024 06:37:06 PM",
      "Leave Time":"04/26/2024 06:38:33 PM",
      "Duration":"2"
    },
    {
      "Name":"PULIVARTHI SARAYU",
      "JoinTime":"04/26/2024 06:38:46 PM",
      "Leave Time":"04/26/2024 06:38:59 PM",
      "Duration":"1"
    },
  ]
  // const report = await pastMeetingParticipantsReport()
  return (
    <div className="p-4 text-center ">
      {/* <pre>{JSON.stringify(report,null,2)}</pre> */}
      <div className="">
        <h1 className="text-4xl mt-4  font-semibold mb-4">Attendance Page</h1>
      </div>
      <p className="text-lg">Monitor your mentees attendance here</p>
      <div className="border my-8">
        {
          students.map((student)=>{
            return (
              <div>
                <h1>{student.Name.split(" ")[0]}</h1>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default AttendancePage;

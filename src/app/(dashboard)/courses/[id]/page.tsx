import React from 'react'
import { getAllAssignmentsByCourseId } from '@/actions/assignments';
import getCurrentUser from '@/actions/getCurrentUser'
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from 'next/link';

const page = async ({ params }: { params: { id: string } }) => {
  const currentUser = await getCurrentUser();

  const courseAssignments = await getAllAssignmentsByCourseId(params.id);

  const maxWords = 50;
  function truncateText(text: string) {
    const words = text.split(/\s+/);
    if (words.length <= maxWords) {
      return text;
    }
    const truncatedText = words.slice(0, maxWords).join(" ");
    return truncatedText + "...";
  }
  return (
    <div className="m-3">
      <h1 className="text-lg text-center md:text-xl border-b-2 font-medium p-2">Assignments</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 p-2 mt-3">
        {
          courseAssignments && courseAssignments[0]?.classes?.length === 0 && (
            <div className=" text-xl mt-5  dark:text-secondary-300">No assignments yet...</div>
          )
        }
        
        {courseAssignments?.map((assignment) =>
          assignment.classes.map((classItem) =>
            classItem.attachments.map((attachment) => (
              <div
                key={attachment?.id}
                className="text-zinc-600 rounded-lg p-4 bg-slate-200"
                style={{
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <Link href={`/assignments/${attachment.id}`} className=" text-base text-blue-600 font-semibold">
                    {attachment?.title}
                  </Link>
                  <p className="flex gap-2 items-center text-sm font-medium">
                    {/* <span className="font-semibold">Due Date:</span>{" "} */}
                    {attachment?.dueDate
                      &&new Date(attachment?.dueDate).toLocaleDateString()
                    }
                      {"  "}
                      {currentUser?.role==="STUDENT"&&
                      <div className="text-white">
                        { 
                          attachment?.submissions.length!==0
                          ? <h1 className="bg-green-500 rounded-lg px-3 ml-1 py-1">submitted</h1>
                          : <h1 className="bg-red-500 rounded-lg px-3 ml-1 py-1">not submitted</h1>
                        }
                      </div>}
                  </p>
                </div>
                <p className="mb-2 text-sm font-semibold mt-2">
                  {truncateText(attachment?.details ? attachment?.details.slice(0, 200) + '...' : null  || "No Description")}
                </p>
                {/* <p className="text-secondary-200 mb-2">Class Name: {classItem?.class?.title || 'null'}</p> */}6
                {attachment?.link && (
                  <div className=" flex items-center text-sm justify-start space-x-2 hover:opacity-90">
                    <a
                      href={attachment?.link}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Assignment
                    </a>
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default page;

import { getAllEvents } from "@/actions/events";
import { EventCategory } from "@prisma/client";
import { RiUserReceivedLine } from "react-icons/ri";
import { BsListTask } from "react-icons/bs";
import { HiOutlineRectangleStack } from "react-icons/hi2";
import { CiUser } from "react-icons/ci";
import { AiOutlineUserDelete } from "react-icons/ai";
import day from "@/lib/dayjs";
// import { getAllCourses, getEnrolledCourses } from "@/actions/courses";

const IconMap: Record<EventCategory, JSX.Element> = {
  "ASSIGNMENT_SUBMISSION": <HiOutlineRectangleStack />,
  "ASSIGNMENT_EVALUATION": <BsListTask />,
  "NEW_USER_GOOGLE_LOGIN": <RiUserReceivedLine />,
  "USER_GOOGLE_LOGIN": <HiOutlineRectangleStack />,
  "USER_CREDENTIAL_LOGIN": <CiUser />,
  "ATTACHMENT_CREATION": <AiOutlineUserDelete />,
  "CLASS_CREATION": <RiUserReceivedLine />,
  "STUDENT_ENROLLMENT_IN_COURSE": <HiOutlineRectangleStack />,
  "DOUBT_CREATION": <CiUser />,
  "DOUBT_RESPONSE": <AiOutlineUserDelete />,
};

const page = async () => {
  // const courses = await getEnrolledCourses();
  const events = await getAllEvents();
  return (
    <div className="relative  bg-slate-50 rounded-lg shadow-md pb-4">
      <div className="relative w-full px-14 h-[92vh] overflow-y-scroll">
        <ul className="relative flex-grow flex flex-col-reverse py-12 pl-6 pr-6 before:absolute before:top-0 before:left-6 before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-6 after:bottom-6 after:-translate-x-1/2 after:border after:border-slate-200">
          {events?.map((activity, index) => (
            <li key={index} className="relative pl-6 mb-4">
              <span className="absolute left-0 z-10 flex items-center justify-center w-8 h-8 -translate-x-1/2 rounded-full bg-slate-200 text-slate-700 ring-2 ring-white p-2">
                {IconMap[activity.eventCategory]}
              </span>
              <div className="flex flex-col ">
                <h4 className="text-sm font-medium text-slate-700">
                  {activity.message}
                </h4>
                <p className="text-xs text-slate-500">{day(activity.createdAt).fromNow()}</p>
              </div>
            </li >
          ))}
        </ul>
      </div>
    </div>
  )
};

export default page
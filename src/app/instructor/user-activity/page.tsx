import { getAllEvents } from "@/actions/events";
import { type EventCategory } from "@prisma/client";
import { RiUserReceivedLine } from "react-icons/ri";
import { BsListTask } from "react-icons/bs";
import { HiOutlineRectangleStack } from "react-icons/hi2";
import { CiUser } from "react-icons/ci";
import { AiOutlineUserDelete } from "react-icons/ai";
import day from "@/lib/dayjs";

const IconMap: Record<EventCategory, JSX.Element> = {
  ASSIGNMENT_SUBMISSION: <HiOutlineRectangleStack />,
  ASSIGNMENT_EVALUATION: <BsListTask />,
  NEW_USER_GOOGLE_LOGIN: <RiUserReceivedLine />,
  USER_GOOGLE_LOGIN: <HiOutlineRectangleStack />,
  USER_CREDENTIAL_LOGIN: <CiUser />,
  ATTACHMENT_CREATION: <AiOutlineUserDelete />,
  CLASS_CREATION: <RiUserReceivedLine />,
  STUDENT_ENROLLMENT_IN_COURSE: <HiOutlineRectangleStack />,
  DOUBT_CREATION: <CiUser />,
  DOUBT_RESPONSE: <AiOutlineUserDelete />,
};

const page = async () => {
  // const courses = await getEnrolledCourses();
  const events = await getAllEvents();
  return (
    <div className="relative rounded-lg bg-slate-50 pb-4 shadow-md">
      <div className="relative h-[92vh] w-full overflow-y-scroll px-14">
        <ul className="relative flex grow flex-col-reverse py-12 pl-6 pr-6 before:absolute before:left-6 before:top-0 before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:bottom-6 after:left-6 after:top-6 after:-translate-x-1/2 after:border after:border-slate-200">
          {events?.map((activity, index) => (
            <li key={index} className="relative mb-4 pl-6">
              <span className="absolute left-0 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-slate-200 p-2 text-slate-700 ring-2 ring-white">
                {IconMap[activity.eventCategory]}
              </span>
              <div className="flex flex-col">
                <h4 className="text-sm font-medium text-slate-700">
                  {activity.message}
                </h4>
                <p className="text-xs text-slate-500">
                  {day(activity.createdAt).fromNow()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;

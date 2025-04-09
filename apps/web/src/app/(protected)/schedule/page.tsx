import { redirect } from "next/navigation";
import { format } from "date-fns";

import { db } from "@/server/db";
import { getServerSession } from "@/lib/auth/session";
import { Calendar } from "./_components/calendar";
import { EventsSidebar } from "./_components/events";

export default async function SchedulePage() {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const courses = await db.course.findMany({
    where: {
      enrolledUsers: {
        some: {
          username: session.user.username,
        },
      },
    },
    include: {
      classes: {
        include: {
          attachments: {
            where: {
              attachmentType: "ASSIGNMENT",
            },
          },
        },
      },
    },
  });

  const holidays = await db.holidays.findMany({});

  const assignments = courses.flatMap((course) =>
    course.classes.flatMap((classItem) =>
      classItem.attachments.map((attachment) => {
        const createdAtDate = new Date(attachment.createdAt);
        const startDate = new Date(createdAtDate);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(createdAtDate);
        endDate.setHours(23, 59, 59, 999);

        return {
          type: "Assignment",
          name: attachment.title,
          description: `Assignment added on ${format(new Date(attachment.createdAt), "MMMM d, yyyy, EEEE, h:mm a")}`,
          startDate,
          endDate,
          link: `assignments/${attachment.id}`,
        };
      })
    )
  );

  const classEvents = courses.flatMap((course) =>
    course.classes.map((classItem) => ({
      type: "Class",
      name: classItem.title,
      description: `Session starts at ${format(new Date(classItem.createdAt), "MMMM d, yyyy, EEEE, h:mm a")}`,
      startDate: new Date(classItem.createdAt),
      endDate: new Date(classItem.createdAt.getTime() + 2000 * 60 * 60),
      link: `courses/${course.id}/classes/${classItem.id}`,
    }))
  );

  const holidayEvents = holidays.map((holiday) => {
    const startDate = new Date(holiday.startDate);
    const endDate = new Date(holiday.endDate);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    return {
      type: "Holiday",
      name: holiday.reason,
      description: holiday?.description || "Observed holiday",
      startDate: startDate,
      endDate: endDate,
      link: "/schedule",
    };
  });

  const isAuthorized = session.user.role === "INSTRUCTOR" || session.user.role === "MENTOR" || false;
  const events = [...assignments, ...classEvents, ...holidayEvents];

  return (
    <div className="bg-background h-full">
      <div className="md:flex gap-2">
        <div className="md:fixed">
          <EventsSidebar events={events} />
        </div>
        <div className="md:ml-[270px] md:flex-1">
          <Calendar events={events} isAuthorized={isAuthorized} holidays={holidays} />
        </div>
      </div>
    </div>
  );
} 
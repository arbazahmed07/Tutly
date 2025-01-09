"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MdEventRepeat } from "react-icons/md";
import { PiTagChevronBold } from "react-icons/pi";
import dayjs from "dayjs";

export function EventsSidebar({ events }: { events: any[] }) {
  const getStatusBadge = (startDate: string, endDate: string) => {
    const today = dayjs().startOf("day");
    const start = dayjs(startDate).startOf("day");
    const end = dayjs(endDate).startOf("day");

    if (end.isBefore(today)) {
      return (
        <span className="ml-auto text-xs font-medium text-red-500 bg-red-100 px-2 py-1 rounded-full">
          Completed
        </span>
      );
    } else if (start.isSame(today)) {
      return (
        <span className="ml-auto text-xs font-medium text-orange-500 bg-orange-100 px-2 py-1 rounded-full">
          Ongoing
        </span>
      );
    } else if (start.isBefore(today) && end.isAfter(today)) {
      return (
        <span className="ml-auto text-xs font-medium text-blue-500 bg-blue-100 px-2 py-1 rounded-full">
          In Progress
        </span>
      );
    } else {
      return (
        <span className="ml-auto text-xs font-medium text-green-500 bg-green-100 px-2 py-1 rounded-full">
          Upcoming
        </span>
      );
    }
  };

  const renderEventItem = (event: any) => (
    <div
      key={event.id}
      className="flex items-center p-3 gap-3 bg-gray-100 dark:bg-gray-800 rounded-md mb-2 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <PiTagChevronBold className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      <div>
        <h1 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {event.name}
        </h1>
      </div>
      {getStatusBadge(event.startDate, event.endDate)}
    </div>
  );

  const today = dayjs().startOf("day");

  // Categorize events
  const todayEvents = events?.filter(
    (event) =>
      dayjs(event.startDate).isSame(today, "day") ||
      (dayjs(event.startDate).isBefore(today) && dayjs(event.endDate).isAfter(today))
  );

  const upcomingEvents = events?.filter(
    (event) => dayjs(event.startDate).isAfter(today, "day")
  );

  const completedEvents = events?.filter((event) =>
    dayjs(event.endDate).isBefore(today, "day")
  );

  const renderEventSection = (
    title: string,
    eventList: any[],
    emptyMessage: string
  ) => (
    <>
      <h2 className="text-base font-bold text-gray-700 dark:text-gray-200 p-2">
        {title}
      </h2>
      {eventList.length === 0 ? (
        <div className="flex flex-col justify-center items-center text-gray-500 dark:text-gray-400 my-5">
          <MdEventRepeat className="h-12 w-12 md:h-16 md:w-16 text-gray-300 dark:text-gray-500" />
          <p className="text-sm mt-4">{emptyMessage}</p>
        </div>
      ) : (
        eventList.map(renderEventItem)
      )}
    </>
  );

  return (
    <div>
      <ScrollArea className="md:h-[550px] overflow-auto">
        <Card className="w-full md:w-[270px] bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
          {renderEventSection("Today's Events", todayEvents, "No events today")}
          {renderEventSection(
            "Upcoming Events",
            upcomingEvents,
            "No upcoming events"
          )}
          {renderEventSection(
            "Completed Events",
            completedEvents,
            "No completed events"
          )}
        </Card>
      </ScrollArea>
    </div>
  );
}

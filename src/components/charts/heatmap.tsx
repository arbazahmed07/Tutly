"use client";

import React, { useState } from "react";
import {
  format,
  startOfToday,
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  getDay,
  isSameDay,
} from "date-fns";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

interface CalendarHeatmapProps {
  classes: string[];
  data: string[];
}

const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({ classes, data }) => {
  const [currentYear, setCurrentYear] = useState(startOfToday().getFullYear());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const generateDatesForYear = (year: number) => {
    const startOfYearDate = startOfYear(new Date(year, 0, 1));
    const endOfYearDate = endOfYear(new Date(year, 0, 1));
    const allDays = eachDayOfInterval({
      start: startOfYearDate,
      end: endOfYearDate,
    }).map((date) => ({
      date,
      isPresent: data?.includes(format(date, "yyyy-MM-dd")),
      isInClass: classes?.includes(format(date, "yyyy-MM-dd")),
    }));

    const paddingDays = getDay(startOfYearDate);

    const paddedDays = Array.from({ length: paddingDays }, () => null).concat(allDays);

    return paddedDays;
  };

  const days = generateDatesForYear(currentYear);

  const handlePreviousYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const handleNextYear = () => {
    setCurrentYear(currentYear + 1);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 text-center font-bold text-gray-500">
        {currentYear}
      </div>
      <div className="mb-2 ms-12 flex gap-12">
        {months.map((month, index) => (
          <h1 key={index} className="text-xs text-gray-400">
            {month}
          </h1>
        ))}
      </div>
      <div className="relative grid grid-flow-col grid-rows-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="px-4 text-center text-sm font-bold text-gray-500"
          >
            {day}
          </div>
        ))}
        {days.map((dateInfo, index) => {
          if (!dateInfo) {
            return <div key={index} className="h-4 w-4"></div>;
          }

          const { date, isPresent, isInClass } = dateInfo;

          let cellColorClass = "bg-gray-500";
          if (isPresent) {
            cellColorClass = "bg-green-500";
          } else if (isInClass) {
            cellColorClass = "bg-red-500";
          }

          return (
            <div
              key={(date as Date).toISOString()}
              className={`relative flex h-4 w-4 cursor-pointer items-center justify-center rounded transition duration-300 hover:scale-110${cellColorClass}`}
              onMouseEnter={() => setHoveredDate(date)}
              onMouseLeave={() => setHoveredDate(null)}
            >
              <div className="hidden">{format(date, "d")}</div>
              {hoveredDate && isSameDay(hoveredDate, date) && (
                <div className="absolute -left-[70px] -top-[15px] z-50 w-20 rounded-l rounded-t bg-black p-1 text-xs text-white">
                  {format(date, "yyyy-MM-dd")}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="my-4 flex items-center gap-4">
        <button
          className="rounded-full bg-secondary-800 p-2 text-white hover:bg-secondary-700"
          onClick={handlePreviousYear}
        >
          <MdNavigateBefore />
        </button>
        <button
          className="rounded-full bg-secondary-800 p-2 text-white hover:bg-secondary-700"
          onClick={handleNextYear}
          disabled={currentYear === startOfToday().getFullYear()}
        >
          <MdNavigateNext />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeatmap;

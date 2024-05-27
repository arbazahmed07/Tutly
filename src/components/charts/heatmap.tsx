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
  subYears,
  addYears,
} from "date-fns";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

interface CalendarHeatmapProps {
  data: string[];
}

const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({ data }) => {
  const [currentYear, setCurrentYear] = useState(startOfToday().getFullYear());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const generateDatesForYear = (year: number) => {
    const startOfYearDate = startOfYear(new Date(year, 0, 1));
    const endOfYearDate = endOfYear(new Date(year, 0, 1));
    const allDays = eachDayOfInterval({ start: startOfYearDate, end: endOfYearDate }).map(
      (date) => ({
        date,
        isPresent: data.includes(format(date, "yyyy-MM-dd")),
      })
    );

    // Get padding days for the first week of January
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
    "December"
  ]

  return (
    <div className="flex flex-col items-center">
      <div className="text-center font-bold mb-2 text-gray-500">
        {currentYear}
      </div>
      <div className="flex ms-12 gap-12 mb-2">
        {
          months.map((month) => (
            <h1 className="text-xs text-gray-400">{month}</h1>
          ))
        }
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-1 relative">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-bold text-sm text-gray-500 px-4">
            {day}
          </div>
        ))}
        {days.map((dateInfo, index) => {
          if (!dateInfo) {
            return <div key={index} className="w-4 h-4"></div>;
          }

          const { date, isPresent } = dateInfo;
          return (
            <div
              key={date.toISOString()}
              className={`relative w-4 h-4 flex items-center justify-center rounded cursor-pointer transition duration-300 transform hover:scale-110 ${
                isPresent ? "bg-green-600" : "bg-gray-500"
              }`}
              onMouseEnter={() => setHoveredDate(date)}
              onMouseLeave={() => setHoveredDate(null)}
            >
              <div className="hidden">{format(date, "d")}</div>
              {hoveredDate && isSameDay(hoveredDate, date) && (
                <div className="absolute -top-[15px] -left-[70px] text-xs w-20 p-1 bg-black text-white rounded-t rounded-l z-50">
                  {format(date, "yyyy-MM-dd")}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 my-4">
        <button
          className="p-2 bg-secondary-800 hover:bg-secondary-700 text-white rounded-full"
          onClick={handlePreviousYear}
        >
          <MdNavigateBefore />
        </button>
        <button
          className="p-2 bg-secondary-800 hover:bg-secondary-700 text-white rounded-full"
          onClick={handleNextYear}
        >
          <MdNavigateNext />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeatmap;

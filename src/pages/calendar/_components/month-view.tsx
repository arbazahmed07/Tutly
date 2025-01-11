import { 
  addDays, 
  endOfMonth, 
  getDate, 
  isSameDay, 
  isSameMonth, 
  startOfMonth, 
  startOfWeek 
} from "date-fns";
import { CiStreamOn } from "react-icons/ci";
interface Event {
  type:string,
  name: string;
  startDate: Date;
  endDate: Date;
}

interface MonthViewProps {
  selectedDate: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
}

export function MonthView({ selectedDate, events, onEventClick }: MonthViewProps) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const today = new Date();

  const weeks = [];
  let currentDay = startDate;

  while (currentDay <= monthEnd) {
    const week = Array.from({ length: 7 }, () => {
      const day = currentDay;
      currentDay = addDays(currentDay, 1);
      return day;
    });
    weeks.push(week);
  }

  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      const eventStart = new Date(event.startDate).setHours(0, 0, 0, 0);
      const eventEnd = new Date(event.endDate).setHours(23, 59, 59, 999);
      const currentDay = day.setHours(0, 0, 0, 0);
      return currentDay >= eventStart && currentDay <= eventEnd;
    });
  };
  

  return (
    <div className="h-full p-4">
      <div className="grid grid-cols-7 gap-px">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
          <div
            key={dayName}
            className="h-8 text-sm font-medium text-center text-muted-foreground"
          >
            {dayName}
          </div>
        ))}
      </div>

      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7 gap-px">
          {week.map((day, dayIndex) => {
            const isToday = isSameDay(day, today);
            const isCurrentMonth = isSameMonth(day, selectedDate);
            const dayEvents = getEventsForDay(day);

            return (
              <div
                key={dayIndex}
                className={`flex flex-col items-start p-2 min-h-[90px] border border-border ${
                  isCurrentMonth ? "bg-background" : "bg-muted/50"
                } ${isToday ? "bg-green-600 text-white" : ""}`}
              >
                <div
                  className={`text-sm mb-1 ${
                    isToday ? "font-bold" : ""
                  }`}
                >
                  {getDate(day)}
                </div>

                <div className="flex flex-col w-full space-y-1">
                  {dayEvents.map((event, index) => (
                    <div
                      key={index}
                      className="text-xs bg-blue-500 text-white rounded px-2 py-1 cursor-pointer overflow-hidden"
                      onClick={() => onEventClick(event)}
                      title={event.name}
                    >
                      {
                        event.type==="Holiday"?
                        <div>{event.type}</div>
                        :
                        (
                        event.type==="Assignment"?
                        <div>{event.name}</div>:
                        <div className="flex items-center gap-1"><CiStreamOn className="font-bold"/>{event.name}</div>
                        )
                      }
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

'use client'

import {
  addDays,
  format,
  isSameDay,
  startOfWeek,
  startOfDay,
  endOfDay,
} from "date-fns";

interface Event {
  name: string;
  startDate: Date;
  endDate: Date;
  color?: string;
}

interface WeekViewProps {
  selectedDate: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
}

export function WeekView({ selectedDate, events, onEventClick }: WeekViewProps) {
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const today = new Date();

  const splitEventForDay = (event: Event, day: Date) => {
    const dayStart = startOfDay(day).getTime();
    const dayEnd = endOfDay(day).getTime();

    const eventStart = event.startDate.getTime();
    const eventEnd = event.endDate.getTime();

    const segmentStart = new Date(Math.max(dayStart, eventStart));
    const segmentEnd = new Date(Math.min(dayEnd, eventEnd));

    return {
      ...event,
      startDate: segmentStart,
      endDate: segmentEnd,
    };
  };

  const getEventsForDay = (day: Date) => {
    return events
      .filter(
        (event) =>
          event.startDate <= endOfDay(day) && event.endDate >= startOfDay(day)
      )
      .map((event) => splitEventForDay(event, day));
  };

  const getEventsLayout = (dayEvents: Event[]): { left: number; width: number }[] => {
    const sortedEvents = dayEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    const eventLayouts: { left: number; width: number }[] = [];

    sortedEvents.forEach((event, index) => {
      const conflictingEvents = sortedEvents.filter((e, i) => 
        i < index && e.endDate > event.startDate
      );

      const column = conflictingEvents.length;
      const maxColumn = Math.max(column, ...eventLayouts.map(layout => layout.left / 25));
      const totalColumns = maxColumn + 1;

      const left = column * (100 / totalColumns);
      const width = 100 / totalColumns;

      eventLayouts.push({ left, width });
    });

    return eventLayouts;
  };

  const getEventStyle = (
    event: Event,
    layout: { left: number; width: number }
  ) => {
    const startMinutes = event.startDate.getHours() * 60 + event.startDate.getMinutes();
    const endMinutes = event.endDate.getHours() * 60 + event.endDate.getMinutes();
    const duration = endMinutes - startMinutes;
  
    return {
      top: `${startMinutes}px`,
      height: `${duration}px`,
      backgroundColor: event.color || "#3b82f6",
      left: `${layout.left + layout.width / 2 - 1}px`,
      width: "40px",
      position: "absolute" as const,
    };
  };
  

  return (
    <div className="h-full overflow-auto">
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="grid grid-cols-[60px_1fr] divide-x divide-border">
          <div className="h-12"></div>
          <div className="grid grid-cols-7 divide-x divide-border">
            {days.map((day) => (
              <div
                key={day.toString()}
                className={`text-center p-3 ${
                  isSameDay(day, today) ? "bg-green-600 text-primary-foreground" : ""
                }`}
              >
                <div className="text-sm font-medium">{format(day, "EEE")}</div>
                <div className="text-sm font-bold">{format(day, "d")}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[60px_1fr] divide-x divide-border">
        <div className="divide-y divide-border">
          {hours.map((hour) => (
            <div
              key={hour}
              className="flex items-center justify-end pr-2 h-[60px] text-sm text-muted-foreground"
            >
              {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 divide-x divide-border">
          {days.map((day) => {
            const dayEvents = getEventsForDay(day);
            const layouts = getEventsLayout(dayEvents);

            return (
              <div key={day.toString()} className="relative divide-y divide-border">
                {hours.map((hour) => (
                  <div key={hour} className="h-[60px]"></div>
                ))}
                {dayEvents.map((event, index) => {
                  const layout = layouts[index];
                  if (!layout) return null;

                  return (
                    <div
                      key={`${event.name}-${event.startDate.getTime()}`}
                      className="absolute p-1 text-xs font-semibold rounded cursor-pointer overflow-hidden text-primary-foreground"
                      style={getEventStyle(event, layout)}
                      onClick={() => onEventClick(event)}
                    >
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


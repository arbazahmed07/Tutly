'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { format,set } from 'date-fns'
import { CalendarIcon, Clock } from 'lucide-react'


interface EventState {
  summary: string;
  description: string;
  startDate: Date | undefined;
  startTime: string;
  startPeriod: 'AM' | 'PM';
  endDate: Date | undefined;
  endTime: string;
  endPeriod: 'AM' | 'PM';
}

export default function CalendarComponent({ currentUser }: any) {
  // const your_calender_id = currentUser?.email
  // for testing purpose
  const your_calender_id ="goutham4126@gmail.com"
  const [event, setEvent] = useState<EventState>({
    summary: '',
    description: '',
    startDate: undefined,
    startTime: '',
    startPeriod: 'AM',
    endDate: undefined,
    endTime: '',
    endPeriod: 'AM',
  })

  const handleAddToCalendar = () => {
    const { summary, description, startDate, startTime, startPeriod, endDate, endTime, endPeriod } = event
    
    if (!startDate || !endDate || !startTime || !endTime) {
      alert('Please fill in all date and time fields')
      return
    }

    const formatDateForGoogle = (date: Date, time: string, period: 'AM' | 'PM'): string => {
      const [hoursStr, minutesStr] = time.split(':');
      const hours = hoursStr ? Number(hoursStr) : 0;
      const minutes = minutesStr ? Number(minutesStr) : 0;
    
      const adjustedHours =
        period === 'AM' ? (hours === 12 ? 0 : hours) : (hours === 12 ? 12 : hours + 12);
    
      const newDate = set(date, { hours: adjustedHours, minutes });
      return format(newDate, "yyyyMMdd'T'HHmmss");
    };
    
    

    const startDateTime = formatDateForGoogle(startDate, startTime, startPeriod)
    const endDateTime = formatDateForGoogle(endDate, endTime, endPeriod)

    const baseURL = 'https://calendar.google.com/calendar/render'
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: summary,
      details: description,
      dates: `${startDateTime}/${endDateTime}`,
    })

    window.open(`${baseURL}?${params.toString()}`, '_blank')
  }

  const TimeInput = ({ value, onChange, period, onPeriodChange }: { 
    value: string; 
    onChange: (value: string) => void; 
    period: 'AM' | 'PM'; 
    onPeriodChange: (value: 'AM' | 'PM') => void; 
  }) => (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className="pl-8"
        />
        <Clock className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      <Select value={period} onValueChange={(value: 'AM' | 'PM') => onPeriodChange(value)}>
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder="AM/PM" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )

  return (
    <div className="space-y-3 mt-3">
      <Card>
          <iframe
            src={`https://calendar.google.com/calendar/embed?src=${your_calender_id}&ctz=America%2FNew_York`}
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="no"
            title="Google Calendar"
          ></iframe>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Add Event to Google Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              handleAddToCalendar()
            }}
          >
            <Input
              placeholder="Event Title"
              value={event.summary}
              onChange={(e) => setEvent({ ...event, summary: e.target.value })}
              required
            />
            <Textarea
              placeholder="Description"
              value={event.description}
              onChange={(e) => setEvent({ ...event, description: e.target.value })}
            />
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Start Date and Time</label>
              <div className="flex space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !event.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {event.startDate ? format(event.startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={event.startDate}
                      onSelect={(date) => setEvent({ ...event, startDate: date || undefined })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <TimeInput
                  value={event.startTime}
                  onChange={(value) => setEvent({ ...event, startTime: value })}
                  period={event.startPeriod}
                  onPeriodChange={(value) => setEvent({ ...event, startPeriod: value })}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">End Date and Time</label>
              <div className="flex space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !event.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {event.endDate ? format(event.endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={event.endDate}
                      onSelect={(date) => setEvent({ ...event, endDate: date || undefined })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <TimeInput
                  value={event.endTime}
                  onChange={(value) => setEvent({ ...event, endTime: value })}
                  period={event.endPeriod}
                  onPeriodChange={(value) => setEvent({ ...event, endPeriod: value })}
                />
              </div>
            </div>
            <Button type="submit">
              Add to Google Calendar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


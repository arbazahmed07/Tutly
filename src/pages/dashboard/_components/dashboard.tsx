import { actions } from "astro:actions";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { MdHolidayVillage } from "react-icons/md";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { DashboardData } from "@/types/dashboard";
import { getGreeting } from "@/utils/getGreeting";

import Holidays from "./Holidays";
import { InstructorCards } from "./InstructorCards";
import { MentorCards } from "./MentorCards";
import { StudentCards } from "./StudentCards";

interface Props {
  data: DashboardData | null;
  name: string | null;
  holidays: any;
  currentUser: any;
}

const Dashboard = ({ data, name, holidays, currentUser }: Props) => {
  if (!data) return <div>No data available</div>;

  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [editingHoliday, setEditingHoliday] = useState<any>(null);

  useEffect(() => {
    if ("courses" in data && data.courses.length > 0) {
      setSelectedCourse(data.courses[0]?.courseId || "");
    }
  }, [data]);

  const renderCards = () => {
    if ("currentUser" in data) {
      return <StudentCards data={data} selectedCourse={selectedCourse} />;
    } else if ("courses" in data) {
      return <MentorCards data={data} selectedCourse={selectedCourse} />;
    } else {
      return <InstructorCards data={data} />;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await actions.holidays_deleteHoliday({ id });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting holiday", error);
    }
  };

  const handleEditSubmit = async (holidayData: any) => {
    try {
      const { id, reason, description, startDate, endDate } = holidayData;
      await actions.holidays_editHolidays({
        id,
        reason,
        description,
        startDate: startDate.toString(),
        endDate: endDate.toString(),
      });
      window.location.reload();
    } catch (error) {
      console.error("Error editing holiday", error);
    }
  };

  const openEditDialog = (holiday: any) => {
    setEditingHoliday({
      id: holiday.id,
      reason: holiday.reason,
      description: holiday.description,
      startDate: holiday.startDate,
      endDate: holiday.endDate,
    });
  };

  const renderCourseSelector = () => {
    if ("courses" in data) {
      return (
        <div className="text-base font-medium text-white">
          <Select
            value={selectedCourse}
            onValueChange={(value) => setSelectedCourse(value)}
            defaultValue={data.courses[0]?.courseId || ""}
          >
            <SelectTrigger className="ml-2 rounded-md bg-white px-2 py-1 text-gray-900">
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent align="end">
              {data.courses.map((course) => (
                <SelectItem key={course.courseId} value={course.courseId || ""}>
                  {course.courseTitle}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="m-2 h-40 rounded-lg bg-gradient-to-l from-blue-400 to-blue-600">
      <div className="flex md:flex-row flex-col justify-between items-center p-8">
        <h1 className="text-2xl font-bold text-white">
          {getGreeting()} {name} 👋
        </h1>
        <div className="md:mt-0 mt-6">{renderCourseSelector()}</div>
      </div>
      <div className="p-2 text-center">{renderCards()}</div>

      {(currentUser?.role === "INSTRUCTOR" || currentUser?.role === "MENTOR") && (
        <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-md">
          <div className="bg-gray-900 rounded-lg shadow-md p-6">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold text-slate-300 mb-6">List of Holidays</h2>
              {currentUser?.role === "INSTRUCTOR" && <Holidays />}
            </div>
            {holidays && holidays.length > 0 ? (
              <ScrollArea className="max-h-[400px] rounded-md border border-gray-700">
                <Table>
                  <TableHeader className="bg-gray-800">
                    <TableRow>
                      <TableHead className="text-slate-300 font-semibold">Reason</TableHead>
                      <TableHead className="text-slate-300 font-semibold">Description</TableHead>
                      <TableHead className="text-slate-300 font-semibold">From</TableHead>
                      <TableHead className="text-slate-300 font-semibold">To</TableHead>
                      {currentUser.role === "INSTRUCTOR" && (
                        <TableHead className="text-slate-300 font-semibold">Actions</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {holidays.map((holiday: any) => (
                      <TableRow
                        key={holiday.id}
                        className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors"
                      >
                        <TableCell className="text-gray-200">{holiday.reason}</TableCell>
                        <TableCell className="text-gray-200">
                          {holiday.description || "No description available"}
                        </TableCell>
                        <TableCell className="text-gray-200">
                          {format(new Date(holiday.startDate), "MMMM d, yyyy, EEEE")}
                        </TableCell>
                        <TableCell className="text-gray-200">
                          {format(new Date(holiday.endDate), "MMMM d, yyyy, EEEE")}
                        </TableCell>
                        {currentUser.role === "INSTRUCTOR" && (
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => openEditDialog(holiday)}
                                  >
                                    Edit
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Holiday</DialogTitle>
                                    <DialogDescription>
                                      Make changes to the holiday details here. Click save when
                                      you're done.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      handleEditSubmit(editingHoliday);
                                    }}
                                  >
                                    <ScrollArea className="h-[400px] overflow-auto">
                                      <div className="p-3">
                                        <label htmlFor="reason">Reason</label>
                                        <Input
                                          id="reason"
                                          className="mt-2"
                                          value={editingHoliday?.reason || ""}
                                          onChange={(e) =>
                                            setEditingHoliday({
                                              ...editingHoliday,
                                              reason: e.target.value,
                                            })
                                          }
                                          required
                                        />
                                      </div>
                                      <div className="p-3">
                                        <label htmlFor="description">Description</label>
                                        <Textarea
                                          id="description"
                                          className="mt-2"
                                          value={editingHoliday?.description || ""}
                                          onChange={(e) =>
                                            setEditingHoliday({
                                              ...editingHoliday,
                                              description: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                      <div className="p-3">
                                        <label htmlFor="startDate">Start Date</label>
                                        <Calendar
                                          id="startDate"
                                          mode="single"
                                          selected={new Date(editingHoliday?.startDate)}
                                          onSelect={(date) =>
                                            setEditingHoliday({
                                              ...editingHoliday,
                                              startDate: date?.toISOString(),
                                            })
                                          }
                                          className="mt-2"
                                        />
                                      </div>
                                      <div className="p-3">
                                        <label htmlFor="endDate">End Date</label>
                                        <Calendar
                                          id="endDate"
                                          mode="single"
                                          selected={new Date(editingHoliday?.endDate)}
                                          onSelect={(date) =>
                                            setEditingHoliday({
                                              ...editingHoliday,
                                              endDate: date?.toISOString(),
                                            })
                                          }
                                          className="mt-2"
                                        />
                                      </div>
                                    </ScrollArea>
                                    <DialogFooter>
                                      <Button type="submit" className="mt-4">
                                        Save changes
                                      </Button>
                                    </DialogFooter>
                                  </form>
                                </DialogContent>
                              </Dialog>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm">
                                    Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete the
                                      holiday.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(holiday.id)}>
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            ) : (
              <div className="flex flex-col justify-center items-center text-white p-8 rounded-lg">
                <MdHolidayVillage className="md:w-24 md:h-24 h-16 w-16 mb-4 text-blue-500" />
                <h1 className="font-semibold text-base">No holidays scheduled</h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

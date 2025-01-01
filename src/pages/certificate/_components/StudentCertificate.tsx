"use client";

import html2canvas from "html2canvas";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { IoMdDownload } from "react-icons/io";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Course {
  courseId: string;
  courseTitle: string;
  assignmentsSubmitted: number;
  totalPoints: number;
  totalAssignments: number;
}

interface User {
  name: string;
  username: string;
}

export default function StudentCertificate({ user, data }: { user: User; data: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeCourse, setActiveCourse] = useState(data.courses[0]?.courseId || "");

  const downloadCertificate = (courseTitle: string) => {
    const certificateElement = document.getElementById(`certificate-${courseTitle}`);
    if (!certificateElement) return;

    setIsLoading(true);
    html2canvas(certificateElement)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = `${user.name}_${courseTitle}_Certificate.png`;
        link.click();
      })
      .finally(() => setIsLoading(false));
  };

  const renderCertificate = (course: Course) => {
    if (course.assignmentsSubmitted !== course.totalAssignments || course.totalAssignments <= 0) {
      return (
        <div className="max-w-3xl mx-auto text-center p-4 bg-yellow-100 rounded-lg">
          <p className="text-lg font-semibold text-yellow-700">
            Complete all {course.courseTitle} assignments to unlock your {course.courseTitle}{" "}
            certificate!
          </p>
          <p className="text-sm text-yellow-600 mt-2">
            Assignments completed: {course.assignmentsSubmitted} / {course.totalAssignments}
          </p>
        </div>
      );
    }

    return (
      <ScrollArea className="w-full">
        <div className="w-[800px] mx-auto">
          <div id={`certificate-${course.courseTitle}`} className="relative w-[800px] h-[566px]">
            <img
              src="/gold_template.png"
              alt="Certificate"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-bold uppercase text-black w-[70%]">
              {user.name}
            </div>
            <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-lg font-medium text-[#333] w-[75%] leading-relaxed">
              This certificate is awarded to <span className="font-bold">{user.name}</span> for
              successfully completing the <span className="font-bold">{course.courseTitle}</span>{" "}
              Course. We recognize their dedication and hard work in acquiring the skills necessary
              for this course.
            </div>
            <div className="absolute top-[70%] left-16 flex flex-col items-center">
              <img src="/signature.png" alt="Signature" className="w-40 h-auto" />
              <p className="text-sm font-bold text-gray-600">Rajesh Thappeta</p>
              <p className="text-xs text-gray-600">Course Instructor</p>
            </div>
            <div className="absolute top-[88%] left-1/2 transform -translate-x-1/2 text-center text-sm font-semibold text-[#555]">
              Presented by <span className="text-blue-900">Tutly</span>
            </div>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  };

  return (
    <div className="mx-auto">
      <AlertDialog open={isLoading}>
        <AlertDialogContent className="flex items-center justify-center">
          <AlertDialogDescription className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            Download in progress...
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
      <Tabs value={activeCourse} onValueChange={setActiveCourse}>
        {data.courses.map((course: Course) => (
          <TabsContent key={course.courseId} value={course.courseId}>
            <div className="flex justify-between items-center mb-6">
              <TabsList className="">
                {data.courses.map((course: Course) => (
                  <TabsTrigger key={course.courseId} value={course.courseId}>
                    {course.courseTitle}
                  </TabsTrigger>
                ))}
              </TabsList>
              {course.assignmentsSubmitted === course.totalAssignments && (
                <Button
                  onClick={() => downloadCertificate(course.courseTitle)}
                  className="flex items-center gap-2"
                >
                  <IoMdDownload className="h-5 w-5" />
                  Download Certificate
                </Button>
              )}
            </div>
            <div>{renderCertificate(course)}</div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

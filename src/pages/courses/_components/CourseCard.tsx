"use client";
import { IoMdBookmarks } from "react-icons/io";
import toast from "react-hot-toast";
import { Suspense, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "@/hooks/use-router";
import { actions } from "astro:actions";

export default function CourseCard({ course, currentUser }: any) {
  const router = useRouter();
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [courseTitle, setCourseTitle] = useState<string>(course.title);
  const [img, setImg] = useState<string>(course.image);
  const [isPublished, setIsPublished] = useState<boolean>(course.isPublished);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEditCourse = async (id: string) => {
    try {
      setIsSubmitting(true);
      const { data, error } = await actions.courses_updateCourse({
        id,
        title: courseTitle,
        isPublished,
        image: img,
      });

      if (!data || error) {
        throw new Error();
      }

      toast.success("Course edited successfully");
      setOpenPopup(false);
      setCourseTitle(data?.title);
      setImg(data?.image);
      setIsPublished(data?.isPublished);

    } catch {
      toast.error("Failed to edit course");
      setCourseTitle(course.title);
      setImg(course.image);
      setIsPublished(course.isPublished);
      setOpenPopup(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const expired = () => {
    if (!course.endDate) return false;
    const endDate = new Date(course.endDate);
    const currentDate = new Date();
    return currentDate > endDate;
  };

  return (
    <Card className="m-auto mt-3 w-[280px] overflow-hidden md:mx-2 ">
      <div
        className="relative h-[150px] cursor-pointer bg-white text-secondary-700"
        onClick={
          expired()
            ? () => router.push("/courses")
            : () => router.push(`/courses/${course.id}`)
        }
      >
        <div className="relative h-full w-full">
          <img
            src={
              course.image ||
              "https://i.postimg.cc/CMGSNVsg/new-course-colorful-label-sign-template-new-course-symbol-web-banner-vector.jpg"
            }
            alt={course.title}
            className="h-full w-full object-cover"
          />
          {!course.isPublished && currentUser?.role === "INSTRUCTOR" && (
            <div className="absolute right-0 top-0 m-3 rounded-md border bg-red-500 px-2 py-1 text-xs text-white">
              Draft
            </div>
          )}
          <div className="absolute bottom-0 right-0 m-3 flex items-center rounded-md border bg-blue-500 px-2 py-1 text-xs text-white">
            <IoMdBookmarks className="mr-1" />
            <span>{course._count.classes} Classes</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t p-3">
        <div className="cursor-pointer">
          <h2 className="font-medium">
            {expired() ? `${course.title} [Expired]` : course.title}
          </h2>
        </div>

        {currentUser.role === "INSTRUCTOR" && (
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                router.push(`/instructor/course/${course.id}/manage`)
              }
            >
              <FaUsersGear className="h-5 w-5" />
            </Button>


            <Dialog open={openPopup} onOpenChange={setOpenPopup}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MdOutlineEdit className="h-5 w-5" />
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Course</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                      placeholder="Enter course title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Publish Status</Label>
                    <RadioGroup
                      value={String(isPublished)}
                      onValueChange={(value) => setIsPublished(value === "true")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="yes" />
                        <Label htmlFor="yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="no" />
                        <Label htmlFor="no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={img || ""}
                      onChange={(e) => setImg(e.target.value)}
                      placeholder="Paste image link here"
                    />
                  </div>

                  <Button
                    className="w-full"
                    disabled={isSubmitting}
                    onClick={() => handleEditCourse(course.id)}
                  >
                    {isSubmitting ? "Saving Changes..." : "Save Changes"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

          </div>
        )}
      </div>
    </Card>
  );
}

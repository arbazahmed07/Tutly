import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
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
import { actions } from "astro:actions";

function AddCourse() {
  const [openPopup, setOpenPopup] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const {data, error} = await actions.courses_createCourse({
        title: courseTitle,
        isPublished,
      });

      if (!data || error) {
        throw new Error();
      }

      toast.success("New course added successfully");
      setCourseTitle("");
      setIsPublished(false);
      setOpenPopup(false);

      window.location.reload();

    } catch {
      toast.error("Failed to add new course");
      setCourseTitle("");
      setIsPublished(false);
      setOpenPopup(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={openPopup} onOpenChange={setOpenPopup}>
      <DialogTrigger asChild>
        <Card className="m-auto my-3 flex h-[200px] w-[280px] cursor-pointer flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white md:mx-2">
          <div className="cursor-pointer text-center">
            <FaPlus className="text-5xl" />
            <h1 className="mt-3 text-xl">Add</h1>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Add New Course
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              onChange={(e) => setCourseTitle(e.target.value)}
              type="text"
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
          <Button
            disabled={isSubmitting || !courseTitle}
            onClick={handleSubmit}
            className="w-full"
          >
            {isSubmitting ? "Creating..." : "Create"}
            &nbsp;
            {isSubmitting ? (
              <div className="animate-spin">
                <FaPlus />
              </div>
            ) : (
              <FaPlus />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddCourse;

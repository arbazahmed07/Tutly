"use client";

import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
  FormItem,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const EditAttachmentPage = ({ attachment }: any) => {
  const {
    title,
    link,
    attachmentType,
    classId,
    courseId,
    details,
    dueDate,
    maxSubmissions,
    submissionMode,
  } = attachment;

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `/api/classes/getClassesById/${courseId}`,
      );
      setClasses(response.data);
      setLoading(false);
    };
    fetchData();
  }, [courseId]);

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      title: title,
      link: link,
      attachmentType: attachmentType,
      submissionMode: submissionMode,
      classId: classId,
      courseId: courseId,
      details: details,
      dueDate: dueDate,
      maxSubmissions: Number(maxSubmissions) || 0,
    },
  });

  const { isSubmitting, errors } = form.formState;
  const [cancelClicked, setCancelClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);

  const onSubmit = async (values: any) => {
    const response = await axios.put(`/api/attachments/edit/${attachment.id}`, {
      ...values,
      dueDate: values?.dueDate
        ? new Date(values.dueDate).toISOString()
        : undefined,
      maxSubmissions: Number(values?.maxSubmissions),
    });

    if (response.status !== 200) {
      toast.error("An error occurred");
      return;
    }
    toast.success("Attachment modified");
    router.push(`/assignments/${attachment.id}`);
  };

  const deleteAssignment = async () => {
    try {
      setDeleteClicked(true);
      const response = await axios.delete(
        `/api/attachments/delete/${attachment.id}`,
      );
      if (response.status !== 200) {
        toast.error("An error occurred");
        return;
      }
      toast.success("Attachment deleted");
      router.push(`/courses/${courseId}/class/${classId}`);
    } catch (e: any) {
      setDeleteClicked(false);
      toast.error("An error occurred");
      router.push(`/courses/${courseId}/class/${classId}`);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-10">
      <div className="space-y-8">
        <h1 className="flex items-center text-xl font-semibold md:text-2xl">
          Edit attachment <FaRegEdit className="ml-4 h-5 w-5" />
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Title</FormLabel>
                    <FormControl>
                      <Input
                        className="text-base"
                        disabled
                        placeholder="eg., React Forms"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="ml-3 select-none text-sm opacity-85 hover:opacity-95">
                      Title cannot be modified
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="attachmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Attachment type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-secondary-700 text-white">
                        <SelectItem
                          className="text-base hover:bg-secondary-800"
                          value="ASSIGNMENT"
                        >
                          Assignment
                        </SelectItem>
                        <SelectItem
                          className="text-base hover:bg-secondary-800"
                          value="ZOOM"
                        >
                          Zoom
                        </SelectItem>
                        <SelectItem
                          className="text-base hover:bg-secondary-800"
                          value="GITHUB"
                        >
                          Github
                        </SelectItem>
                        <SelectItem
                          className="text-base hover:bg-secondary-800"
                          value="OTHERS"
                        >
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="maxSubmissions"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Max Submissions</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        className="text-base"
                        disabled={isSubmitting}
                        placeholder="eg., max Submissions..."
                        {...field}
                      />
                    </FormControl>
                    {errors.maxSubmissions && (
                      <FormMessage>
                        Max Submissions must be a number
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                name="dueDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Due Date</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm"
                        disabled={isSubmitting}
                        type="date"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="classId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Assign a class</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-secondary-700 text-base text-white">
                        {classes.map((c: any) => (
                          <SelectItem
                            key={c.id}
                            value={c.id}
                            className="hover:bg-secondary-800"
                          >
                            {c.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="submissionMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Submission Mode</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a mode" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-secondary-700 text-white">
                        <SelectItem
                          className="hover:bg-secondary-800"
                          value="HTML_CSS_JS"
                        >
                          HTML_CSS_JS
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-secondary-800"
                          value="REACT"
                        >
                          REACT
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-secondary-800"
                          value="EXTERNAL_LINK"
                        >
                          EXTERNAL_LINK
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="link"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Link</FormLabel>
                  <FormControl>
                    <Input
                      className="text-sm"
                      disabled={isSubmitting}
                      placeholder="Paste Link here..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="details"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Details</FormLabel>
                  <FormControl>
                    <Textarea
                      className="text-sm"
                      disabled={isSubmitting}
                      placeholder="Write some details here..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-x-4">
                <Button
                  disabled={cancelClicked}
                  onClick={() => {
                    router.push(`/assignments/${attachment.id}`);
                    setCancelClicked(true);
                  }}
                  className={`${
                    !cancelClicked
                      ? "bg-red-700 hover:bg-red-800"
                      : "cursor-not-allowed bg-gray-600"
                  }`}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-secondary-500 hover:bg-secondary-600"
                  disabled={isSubmitting}
                >
                  Continue
                </Button>
              </div>
              <Button
                onClick={deleteAssignment}
                className={`${
                  !deleteClicked
                    ? "bg-red-700 hover:bg-red-800"
                    : "cursor-not-allowed bg-gray-600"
                }`}
              >
                <MdDelete className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditAttachmentPage;

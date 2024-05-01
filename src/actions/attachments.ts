import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import * as z from "zod";

const attachmentSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  link: z.string().optional(),
  attachmentType: z.enum(["ASSIGNMENT", "GITHUB", "ZOOM", "OTHERS"]),
  classId: z.string().min(1, {
    message: "Class is required",
  }),
  courseId: z.string().optional(),
  details: z.string().optional(),
  dueDate: z.string().optional(),
  maxSubmissions: z.number().optional()
});

export const createAttachment = async (data : z.infer<typeof attachmentSchema>) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("You must be logged in to upload an attachment");
  }

  const attachment = await db.attachment.create({
    data: {
      title: data.title,
      classId: data.classId,
      courseId: data.courseId,
      link: data.link,
      attachmentType: data.attachmentType ,
      details: data.details,
      dueDate: data.dueDate,
      maxSubmissions:data.maxSubmissions,
    },
  });

  return attachment;
};

export const getAttachmentByID = async (id: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("You must be logged in to view an attachment");
  }
  
  const attachment = await db.attachment.findUnique({
    where: {
      id,
    },
  });

  return attachment;
}

export const deleteAttachment = async (id: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("You must be logged in to delete an attachment");
  }

  const attachment = await db.attachment.delete({
    where: {
      id,
    },
  });

  return attachment;
}

export const editAttachment = async (id: string, data : z.infer<typeof attachmentSchema>) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("You must be logged in to edit an attachment");
  }

  const attachment = await db.attachment.update({
    where: {
      id,
    },
    data: {
      title: data.title,
      classId: data.classId,
      courseId: data.courseId,
      link: data.link,
      attachmentType: data.attachmentType ,
      details: data.details,
      dueDate: data.dueDate,
      maxSubmissions:data.maxSubmissions,
    },
  });

  return attachment;
}
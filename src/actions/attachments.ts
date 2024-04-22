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
  details: z.string().optional(),
  dueDate: z.string().optional(),
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
      link: data.link,
      attachmentType: data.attachmentType ,
      details: data.details,
      dueDate: data.dueDate,
    },
  });

  return attachment;
};

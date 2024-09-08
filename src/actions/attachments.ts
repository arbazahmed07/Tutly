import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import * as z from "zod";

const attachmentSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  link: z.string().optional(),
  attachmentType: z.enum(["ASSIGNMENT", "GITHUB", "ZOOM", "OTHERS"]),
  submissionMode: z.enum(["HTML_CSS_JS", "REACT", "EXTERNAL_LINK"]),
  classId: z.string().min(1, {
    message: "Class is required",
  }),
  courseId: z.string().optional(),
  details: z.string().optional(),
  dueDate: z.string().optional(),
  maxSubmissions: z.number().int().positive().optional(),
});

export const createAttachment = async (data : z.infer<typeof attachmentSchema>) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("You must be logged in to upload an attachment");
  }

  if( data.maxSubmissions &&  data.maxSubmissions<=0){
    throw new Error("Max Submissions must be greater than 0");
  }

  if(currentUser.role !=='INSTRUCTOR'){
    throw new Error("You must be an instructor to upload an attachment");
  }


  const attachment = await db.attachment.create({
    data: {
      title: data.title,
      classId: data.classId,
      courseId: data.courseId,
      link: data.link,
      attachmentType: data.attachmentType,
      submissionMode: data.submissionMode,
      details: data.details,
      dueDate: data.dueDate,
      maxSubmissions: data.maxSubmissions,
    },
  });

  await db.events.create({
    data: {
      eventCategory:"ATTACHMENT_CREATION",
      causedById: currentUser.id,
      eventCategoryDataId: attachment.id,
    },
  });

  return attachment;
};

export const getAttachmentByID = async (id: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("You must be logged in to view an attachment");
  }
  if(currentUser.role !=='INSTRUCTOR'){
    throw new Error("You must be an instructor to create an attachment");
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
  if(currentUser.role !=='INSTRUCTOR'){
    throw new Error("You must be an instructor to delete an attachment");
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
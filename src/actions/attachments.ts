import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import { type Attachment } from "@prisma/client";

export const createAttachment = async (data: Attachment) => {
  const currentUser = await getCurrentUser();

  const isCourseAdmin = currentUser?.adminForCourses?.some(
    (course) => course.id === data.courseId,
  );
  const haveAccess =
    currentUser && (currentUser.role === "INSTRUCTOR" ?? isCourseAdmin);

  if (!haveAccess) {
    throw new Error("Unauthorized");
  }

  if (data.maxSubmissions && data.maxSubmissions <= 0) {
    throw new Error("Max Submissions must be greater than 0");
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
      eventCategory: "ATTACHMENT_CREATION",
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

  const attachment = await db.attachment.findUnique({
    where: {
      id,
    },
  });

  return attachment;
};

export const deleteAttachment = async (id: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("You must be logged in to delete an attachment");
  }
  if (currentUser.role !== "INSTRUCTOR") {
    throw new Error("You must be an instructor to delete an attachment");
  }

  const attachment = await db.attachment.delete({
    where: {
      id,
    },
  });

  return attachment;
};

export const editAttachment = async (id: string, data: Attachment) => {
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
      attachmentType: data.attachmentType,
      submissionMode: data.submissionMode,
      details: data.details,
      dueDate: data.dueDate,
      maxSubmissions: data.maxSubmissions,
    },
  });

  return attachment;
};

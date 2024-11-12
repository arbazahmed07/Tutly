import { defineAction } from "astro:actions";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { attachmentType, submissionMode, type Attachment } from "@prisma/client";
import { z } from "zod";

export const createAttachment = defineAction({
  input: z.object({
    data: z.object({
      title: z.string(),
      classId: z.string().nullable(),
      courseId: z.string().nullable(),
      link: z.string().nullable(),
      attachmentType: z.string().transform(val => val as attachmentType),
      submissionMode: z.string().transform(val => val as submissionMode),
      details: z.string().nullable(),
      dueDate: z.date().nullable(),
      maxSubmissions: z.number().nullable()
    })
  }),
  async handler({ data }, { locals }) {
    const currentUser = locals.user!

    const isCourseAdmin = currentUser?.adminForCourses?.some(
      (course) => course.id === data.courseId,
    );
    const haveAccess =
      currentUser && (currentUser.role === "INSTRUCTOR" || isCourseAdmin);

    if (!haveAccess) {
      return { error: "Unauthorized" };
    }

    if (data.maxSubmissions && data.maxSubmissions <= 0) {
      return { error: "Max Submissions must be greater than 0" };
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

    return {
      success: true,
      data: attachment
    };
  }
});

export const getAttachmentByID = defineAction({
  input: z.object({
    id: z.string()
  }),
  async handler({ id }, { locals }) {
    const currentUser = locals.user!

    const attachment = await db.attachment.findUnique({
      where: {
        id,
      },
    });

    return {
      success: true,
      data: attachment
    };
  }
});

export const deleteAttachment = defineAction({
  input: z.object({
    id: z.string()
  }),
  async handler({ id }, { locals }) {
    const currentUser = locals.user!

    if (currentUser.role !== "INSTRUCTOR") {
      return { error: "You must be an instructor to delete an attachment" };
    }

    const attachment = await db.attachment.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      data: attachment
    };
  }
});

export const editAttachment = defineAction({
  input: z.object({
    id: z.string(),
    data: z.custom<Attachment>()
  }),
  async handler({ id, data }, { locals }) {
    const currentUser = locals.user!

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

    return {
      success: true,
      data: attachment
    };
  }
});

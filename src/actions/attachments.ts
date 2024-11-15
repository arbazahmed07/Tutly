import { defineAction } from "astro:actions";
import db from "@/lib/db";
import { attachmentType, submissionMode, type Attachment } from "@prisma/client";
import { z } from "zod";

export const createAttachment = defineAction({
  input: z.object({
    title: z.string(),
    details: z.string().optional(),
    link: z.string().optional(),
    dueDate: z.date().optional(),
    attachmentType: z.enum(["ASSIGNMENT", "GITHUB", "ZOOM", "OTHERS"] as const),
    courseId: z.string(),
    classId: z.string(),
    maxSubmissions: z.number().optional(),
    submissionMode: z.enum(["HTML_CSS_JS","REACT","EXTERNAL_LINK"])
  }),
  async handler({ title, details, link, dueDate, attachmentType, courseId, classId, maxSubmissions, submissionMode }, { locals }) {
    try {
      const currentUser = locals.user;
      if (!currentUser || currentUser.role !== "INSTRUCTOR") {
        return { error: "Unauthorized" };
      }

      const attachment = await db.attachment.create({
        data: {
          title,
          classId,
          link: link || null,
          details: details || null,
          attachmentType: attachmentType as attachmentType,
          submissionMode: submissionMode as submissionMode,
          dueDate: dueDate || null,
          courseId,
          maxSubmissions: maxSubmissions || null,
        },
      });

      return { success: true, data: attachment };
    } catch (error) {
      console.error("Error creating attachment:", error);
      return { error: "Failed to create attachment" };
    }
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

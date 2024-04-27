import { db } from "@/lib/db";
import * as z from "zod";
import getCurrentUser from "./getCurrentUser";

// Define the schema for class data
const classSchema = z.object({
  classTitle: z.string().trim().min(1, {
    message: "Title is required",
  }),
  videoLink: z.string().trim().min(1),
  videoType: z.enum(["DRIVE", "YOUTUBE", "ZOOM"]),
  courseId: z.string().trim().min(1),
  folderId: z.string().optional(),
  folderName: z.string().optional(),
});

export const createClass = async (data: any) => {
  const { classTitle, videoLink, videoType, courseId, folderId, folderName } =
    classSchema.parse(data);

  let myClass;

  try {
    // If folderId is provided, connect to the existing folder
    if (folderId) {
      myClass = await db.class.create({
        data: {
          title: classTitle,
          video: {
            create: {
              videoLink: videoLink,
              videoType: videoType,
            },
          },
          course: {
            connect: {
              id: courseId,
            },
          },
          Folder: {
            connect: {
              id: folderId,
            },
          },
        },
      });
    }
    // If folderName is provided, create a new folder
    else if (folderName) {
      myClass = await db.class.create({
        data: {
          title: classTitle,
          video: {
            create: {
              videoLink: videoLink,
              videoType: videoType,
            },
          },
          course: {
            connect: {
              id: courseId,
            },
          },
          Folder: {
            create: {
              title: folderName,
            },
          },
        },
      });
    }
    else {
      myClass = await db.class.create({
        data: {
          title: classTitle,
          video: {
            create: {
              videoLink: videoLink,
              videoType: videoType,
            },
          },
          course: {
            connect: {
              id: courseId,
            },
          },
        },
      });
    }

    return myClass;
  } catch (error) {
    console.error("Error creating class:", error);
    throw new Error("Failed to create class. Please try again later.");
  }
};

export const updateClass = async (classId: string, data: any) => {
  const currentUser = await getCurrentUser();
  if(currentUser?.role !== "INSTRUCTOR"){  
    throw new Error("You are not authorized to update this class.");
  }

  const { classTitle, videoLink, videoType } = classSchema.parse(data);

  try {
    const myClass = await db.class.update({
      where: {
        id: classId,
      },
      data: {
        title: classTitle,
        video: {
          update: {
            videoLink: videoLink,
            videoType: videoType,
          },
        },
      },
    });

    return myClass;
  } catch (error) {
    console.error("Error updating class:", error);
    throw new Error("Failed to update class. Please try again later.");
  }
};


export const deleteClass = async (classId: string) => {
  const currentUser = await getCurrentUser();
  if(currentUser?.role !== "INSTRUCTOR"){  
    throw new Error("You are not authorized to delete this class.");
  }

  try {
    const res = await db.class.delete({
      where: {
        id: classId,
      },
    });
  } catch (error) {
    console.error("Error deleting class:", error);
    throw new Error("Failed to delete class. Please try again later.");
  }

  return { success: true };
  
}
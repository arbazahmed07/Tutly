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
  createdAt: z.string().optional(),
  folderId: z.string().optional(),
  folderName: z.string().optional(),
});

export const createClass = async (data: {
  classTitle: string;
  videoLink: string;
  videoType: string;
  courseId: string;
  folderId: string;
  folderName: string;
  createdAt: string;
}) => {
  const {
    classTitle,
    videoLink,
    videoType,
    courseId,
    folderId,
    folderName,
    createdAt,
  } = classSchema.parse(data);
  let myClass;

  try {
    // If folderId is provided, connect to the existing folder
    if (folderId) {
      myClass = await db.class.create({
        data: {
          title: classTitle,
          createdAt: new Date(createdAt ?? ""),
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
          createdAt: new Date(createdAt ?? ""),
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
    } else {
      myClass = await db.class.create({
        data: {
          title: classTitle,
          createdAt: new Date(createdAt ?? ""),
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
  } catch {
    throw new Error("Failed to create class. Please try again later.");
  }
};

export const updateClass = async (data: {
  classId: string;
  courseId: string;
  classTitle: string;
  videoLink: string;
  videoType: string;
  folderId: string;
  folderName: string;
  createdAt: string;
}) => {
  const currentUser = await getCurrentUser();
  const isCourseAdmin = currentUser?.adminForCourses?.some(
    (course) => course.id === data.courseId,
  );
  const haveAccess =
    currentUser && (currentUser.role === "INSTRUCTOR" ?? isCourseAdmin);
  if (!haveAccess) {
    throw new Error("You are not authorized to update this class.");
  }

  const { classTitle, videoLink, videoType, folderId, folderName, createdAt } =
    classSchema.parse(data);

  let newFolderId = undefined;

  if (folderId && folderName) {
    await db.folder.update({
      where: {
        id: folderId,
      },
      data: {
        title: folderName,
        createdAt: new Date(createdAt ?? ""),
      },
    });
    newFolderId = folderId;
  } else if (folderName) {
    const res = await db.folder.create({
      data: {
        title: folderName,
        createdAt: new Date(createdAt ?? ""),
      },
    });
    newFolderId = res.id;
  } else {
    newFolderId = folderId;
  }

  try {
    const myClass = await db.class.update({
      where: {
        id: data.classId,
      },
      data: {
        title: classTitle,
        createdAt: new Date(createdAt ?? ""),
        video: {
          update: {
            videoLink: videoLink,
            videoType: videoType,
          },
        },
        Folder: {
          connect: {
            id: newFolderId,
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
  try {
    await db.class.delete({
      where: {
        id: classId,
      },
    });
  } catch (error) {
    console.error("Error deleting class:", error);
    throw new Error("Failed to delete class. Please try again later.");
  }

  return { success: true };
};

export const totalNumberOfClasses = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("You are not authorized to view this page.");
  }

  try {
    const res = await db.class.count();
    return res;
  } catch (error) {
    console.error("Error getting total number of classes:", error);
    throw new Error(
      "Failed to get total number of classes. Please try again later.",
    );
  }
};

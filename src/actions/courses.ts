import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

export const getAllCourses = async () => {
  const currentUser = await getCurrentUser();
  try {
    if (!currentUser) return null;
    let courses;
    if (currentUser.role === "INSTRUCTOR") {
      courses = await db.course.findMany({
        where: {
          createdById: currentUser.id,
        },
        include: {
          _count: {
            select: {
              classes: true,
            },
          },
        },
      });
    } else if (currentUser.role === "MENTOR") {
      courses = await db.course.findMany({
        where: {
          enrolledUsers: {
            some: {
              mentorUsername: currentUser.username,
            },
          },
        },
        include: {
          _count: {
            select: {
              classes: true,
            },
          },
        },
      });
    } else {
      courses = await db.course.findMany({
        where: {
          enrolledUsers: {
            some: {
              user: {
                id: currentUser.id,
              },
            },
          },
        },
        include: {
          _count: {
            select: {
              classes: true,
            },
          },
        },
      });
    }
    return courses;
  } catch (e) {
    console.log("error while fetching courses :", e);
  }
};

export const getCourseClasses = async (id: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const classes = await db.class.findMany({
    where: {
      courseId: id,
    },
    include: {
      course: true,
      video: true,
      attachments: true,
      Folder: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return classes;
};

export const foldersByCourseId = async (id: string) => {
  const folders = await db.folder.findMany({
    where: {
      Class: {
        some: {
          courseId: id,
        },
      },
    },
  });
  return folders;
};

export const getEnrolledCourses = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  const courses = await db.course.findMany({
    where: {
      enrolledUsers: {
        some: {
          username: currentUser.username,
        },
      },
    },
    include: {
      classes: true,
      createdBy: true,
      _count: {
        select: {
          classes: true,
        },
      },
      courseAdmins: true,
    },
  });

  courses.forEach((course) => {
    course.classes.sort((a, b) => {
      return Number(a.createdAt) - Number(b.createdAt);
    });
  });

  const publishedCourses = courses.filter((course) => course.isPublished);
  // const createdCourses = courses.filter(
  //   (course) => course.createdById === currentUser.id
  // );

  if (currentUser.role === "INSTRUCTOR") return courses;
  return publishedCourses;
};

export const getCreatedCourses = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  const courses = await db.course.findMany({
    where: {
      createdById: currentUser.id,
    },
    include: {
      classes: true,
      createdBy: true,
      _count: {
        select: {
          classes: true,
        },
      },
    },
  });

  courses.forEach((course) => {
    course.classes.sort((a, b) => {
      return Number(a.createdAt) - Number(b.createdAt);
    });
  });

  return courses;
};

export const getEnrolledCoursesById = async (id: string) => {
  const courses = await db.course.findMany({
    where: {
      enrolledUsers: {
        some: {
          user: {
            id: id,
          },
        },
      },
    },
    include: {
      classes: true,
      createdBy: true,
      _count: {
        select: {
          classes: true,
        },
      },
    },
  });
  return courses;
};
export const getEnrolledCoursesByUsername = async (username: string) => {
  const courses = await db.course.findMany({
    where: {
      enrolledUsers: {
        some: {
          user: {
            username: username,
          },
        },
      },
    },
    include: {
      classes: true,
      createdBy: true,
      _count: {
        select: {
          classes: true,
        },
      },
    },
  });
  return courses;
};

export const getMentorStudents = async (courseId: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const students = await db.user.findMany({
    where: {
      role: "STUDENT",
      enrolledUsers: {
        some: {
          mentorUsername: currentUser.username,
          courseId,
        },
      },
    },
    include: {
      course: true,
      enrolledUsers: true,
    },
    orderBy: {
      username: "asc",
    },
  });

  return students;
};
export const getMentorStudentsById = async (id: string, courseId: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const students = await db.user.findMany({
    where: {
      enrolledUsers: {
        some: {
          mentorUsername: id,
          courseId,
        },
      },
    },
    include: {
      course: true,
      enrolledUsers: true,
    },
    orderBy: {
      username: "asc",
    },
  });

  return students;
};

export const getEnrolledStudents = async (courseId: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const students = await db.user.findMany({
    where: {
      enrolledUsers: {
        some: {
          course: {
            id: courseId,
          },
        },
      },
      role: "STUDENT",
    },
    include: {
      course: true,
      enrolledUsers: true,
    },
  });

  return students;
};

export const getAllStudents = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const students = await db.user.findMany({
    where: {
      role: "STUDENT",
    },
    include: {
      course: true,
      enrolledUsers: true,
    },
  });

  return students;
};
export const getEnrolledMentees = async (courseId: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const students = await db.user.findMany({
    where: {
      role: "MENTOR",
      enrolledUsers: {
        some: {
          course: {
            id: courseId,
          },
        },
      },
    },
    include: {
      course: true,
      enrolledUsers: true,
    },
  });

  return students;
};

export const createCourse = async ({
  title,
  isPublished,
  image,
}: {
  title: string;
  isPublished: boolean;
  image: string;
}) => {
  const currentUser = await getCurrentUser();
  if (currentUser?.role !== "INSTRUCTOR") return null;
  if (!title.trim() || title === "") {
    return null;
  }

  const newCourse = await db.course.create({
    data: {
      title: title,
      createdById: currentUser.id,
      isPublished,
      image: image,
      enrolledUsers: {
        create: {
          username: currentUser.username,
        },
      },
    },
  });
  return newCourse;
};

export const updateCourse = async ({
  id,
  title,
  isPublished,
  image,
}: {
  id: string;
  title: string;
  isPublished: boolean;
  image: string;
}) => {
  const currentUser = await getCurrentUser();
  if (currentUser?.role !== "INSTRUCTOR") return null;

  if (!title.trim() || title === "") {
    return null;
  }

  const course = await db.course.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      isPublished,
      image,
    },
  });
  return course;
};

export const getMentorCourses = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const courses = await db.course.findMany({
    where: {
      enrolledUsers: {
        some: {
          mentorUsername: currentUser.username,
        },
      },
    },
    include: {
      classes: true,
      createdBy: true,
      _count: {
        select: {
          classes: true,
        },
      },
    },
  });

  courses.forEach((course) => {
    course.classes.sort((a, b) => {
      return Number(a.createdAt) - Number(b.createdAt);
    });
  });

  return courses;
};

export const getClassDetails = async (id: string) => {
  const classDetails = await db.class.findUnique({
    where: {
      id: id,
    },
    include: {
      video: true,
      attachments: true,
      Folder: true,
    },
  });
  return classDetails;
};

export const getCourseByCourseId = async (id: string) => {
  const course = await db.course.findUnique({
    where: {
      id: id,
    },
  });
  return course;
};

export const enrollStudentToCourse = async (
  courseId: string,
  username: string,
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "INSTRUCTOR") {
      throw new Error("Unauthorized to enroll student to course");
    }

    const user = await db.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const course = await db.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new Error("Course not found");
    }

    const existingEnrollment = await db.enrolledUsers.findFirst({
      where: {
        courseId,
        username,
      },
    });

    if (existingEnrollment) {
      throw new Error("User is already enrolled in the course");
    }

    const newEnrollment = await db.enrolledUsers.create({
      data: {
        courseId,
        username,
      },
    });

    await db.events.create({
      data: {
        eventCategory: "STUDENT_ENROLLMENT_IN_COURSE",
        causedById: currentUser.id,
        eventCategoryDataId: newEnrollment.id,
      },
    });

    return newEnrollment;
  } catch {
    throw new Error(`Failed to enroll student`);
  }
};

export const unenrollStudentFromCourse = async (
  courseId: string,
  username: string,
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "INSTRUCTOR") {
      throw new Error("Unauthorized to unenroll student from course");
    }

    const user = await db.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const course = await db.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new Error("Course not found");
    }

    const existingEnrollment = await db.enrolledUsers.findFirst({
      where: {
        courseId,
        username,
      },
    });

    if (!existingEnrollment) {
      throw new Error("User is not enrolled in the course");
    }

    await db.enrolledUsers.delete({
      where: {
        id: existingEnrollment.id,
      },
    });

    return existingEnrollment;
  } catch {
    throw new Error(`Failed to unenroll student`);
  }
};

export const updateRole = async (username: string, role: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "INSTRUCTOR") {
      throw new Error("Unauthorized to update user role");
    }

    const user = await db.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        role: role as "STUDENT" | "MENTOR",
      },
    });

    return updatedUser;
  } catch {
    throw new Error(`Failed to update user role`);
  }
};

export const updateMentor = async (
  courseId: string,
  username: string,
  mentorUsername: string,
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "INSTRUCTOR") {
      throw new Error("Unauthorized to update mentor");
    }
    const enrolledUser = await db.enrolledUsers.findFirst({
      where: {
        courseId,
        username,
      },
    });

    if (!enrolledUser) {
      throw new Error("User is not enrolled in the course");
    }

    const updatedUser = await db.enrolledUsers.update({
      where: {
        id: enrolledUser.id,
      },
      data: {
        mentorUsername,
      },
    });

    return updatedUser;
  } catch {
    throw new Error(`Failed to update mentor`);
  }
};

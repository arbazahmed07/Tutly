import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

export const getAllCourses = async () => {
  try {
    const courses = await db.course.findMany({
      where: {},
      include: {
        _count: {
          select: {
            classes: true,
          },
        },
      },
    });
    return courses;
  } catch (e) {
    console.log("error while fetching courses :", e);
  }
};

export const getCourseClasses = async (id: string) => {
  const course = await db.course.findUnique({
    where: {
      id: id,
    },
  });

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
  });
  return {classes,course};
};

export const getEnrolledCourses = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  const courses = await db.course.findMany({
    where: {
      enrolledUsers: {
        some: {
          userId: currentUser.id,
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
  return courses;
};

export const getEnrolledCoursesById = async (id: string) => {
  const courses = await db.course.findMany({
    where: {
      enrolledUsers: {
        some: {
          userId: id,
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

export const getMentorStudents = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const students = await db.user.findMany({
    where: {
      enrolledUsers: {
        some: {
          assignedMentors: {
            some: {
              mentorId: currentUser.id,
            },
          },
        },
      },
    },
    include: {
      course: true,
      enrolledUsers:true
    },
  });

  return students;
};

export const getEnrolledStudents = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const students = await db.user.findMany({
    where:{
      enrolledUsers:{
        some:{
          course:{
            createdById:currentUser.id
          }
        }
      }
    },
    include: {
      course: true,
      enrolledUsers:true
    },
  });

  return students;
};

export const createCourse = async ({ title,isPublished,image }: { title: string;isPublished:boolean,image:string }) => {
  
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  if(!title.trim() || title==="" )
  {
    return null;
  }

  const newCourse = await db.course.create({
    data: {
      title: title,
      createdById: currentUser.id,
      isPublished,
      image ,
      enrolledUsers:{
        create:{
          userId:currentUser.id
        }
      }
    },
  });
  return newCourse;
};

export const getMentorCourses = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const courses = await db.course.findMany({
    where: {
      enrolledUsers: {
        some: {
          assignedMentors: {
            some: {
              mentorId: currentUser.id,
            },
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
      enrolledUsers:{
        
      }
    },
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
    },
  });
  return classDetails;
};

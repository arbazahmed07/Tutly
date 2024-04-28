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
  });
  return classes;
};

export const foldersByCourseId = async (id: string) => {
  const folders = await db.folder.findMany({
    where: {
      Class:{
        some:{
          courseId:id
        }
      }
    },
  });
  return folders;
}

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
  if(currentUser?.role !== "INSTRUCTOR") return null;
  

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


export const updateCourse = async ({ id, title, isPublished,image }: { id: string; title: string; isPublished:boolean,image:string }) => {
  const currentUser = await getCurrentUser();
  if(currentUser?.role !== "INSTRUCTOR") return null;

  if(!title.trim() || title==="" )
  {
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
}

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
}
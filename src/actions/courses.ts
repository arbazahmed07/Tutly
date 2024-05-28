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
    },
  });

  const publishedCourses = courses.filter((course) => course.isPublished);
  const instructorCourses = courses.filter((course) => course.createdById === currentUser.id);

  if(currentUser.role === "INSTRUCTOR")
    return instructorCourses;
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
  return courses;
};

export const getEnrolledCoursesById = async (id: string) => {
  const courses = await db.course.findMany({
    where: {
      enrolledUsers: {
        some: {
          user:{
            id:id
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

export const getMentorStudents = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const students = await db.user.findMany({
    where: {
      enrolledUsers: {
        some: {
          mentorUsername: currentUser.username,
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
export const getMentorStudentsById = async (id:string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const students = await db.user.findMany({
    where: {
      enrolledUsers: {
        some: {
          mentorUsername: id,
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
      },
      role:"STUDENT"
    },
    include: {
      course: true,
      enrolledUsers:true
    },
  });

  return students;
};
export const getEnrolledMentees = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const students = await db.user.findMany({
    where:{
      role:"MENTOR",
      enrolledUsers:{
        some:{
          course:{
            createdById:currentUser.id,
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
          username:currentUser.username,
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


export const enrollStudentToCourse = async (courseId: string, username: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'INSTRUCTOR') {
      throw new Error('Unauthorized to enroll student to course');
    }
    
    const user = await db.user.findUnique({
      where: { username },
    });
    
    if (!user ) {
      throw new Error ('User not found')
    }

    const course = await db.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new Error('Course not found');
    }

    const existingEnrollment = await db.enrolledUsers.findFirst({
      where: {
        courseId,
        username,
      },
    });

    if (existingEnrollment) {
      throw new Error('User is already enrolled in the course');
    }

    const newEnrollment = await db.enrolledUsers.create({
      data: {
        courseId,
        username,
      },
    });

    return newEnrollment;
  } catch (error : any) {
    throw new Error(`Failed to enroll student: ${error.message}`);
  }
};


export const unenrollStudentFromCourse = async (courseId: string, username: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'INSTRUCTOR') {
      throw new Error('Unauthorized to unenroll student from course');
    }
    
    const user = await db.user.findUnique({
      where: { username },
    });

    if (!user ) {
      throw new Error('User not found')
    }

    const course = await db.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new Error('Course not found');
    }

    const existingEnrollment = await db.enrolledUsers.findFirst({
      where: {
        courseId,
        username,
      },
    });

    if (!existingEnrollment) {
      throw new Error('User is not enrolled in the course');
    }

    await db.enrolledUsers.delete({
      where: {
        id: existingEnrollment.id,
      },
    });

    return existingEnrollment;
  } catch (error : any) {
    throw new Error(`Failed to unenroll student: ${error.message}`);
  }
}

export const updateRole = async (username: string,role :string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'INSTRUCTOR') {
      throw new Error('Unauthorized to update user role');
    }
    
    const user = await db.user.findUnique({
      where: { username },
    });

    if (!user ) {
      throw new Error('User not found')
    }

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        role: role  as  'STUDENT' | 'MENTOR',
      },
    });

    return updatedUser;
  } catch (error : any) {
    throw new Error(`Failed to update user role: ${error.message}`);
  }
}

export const updateMentor = async (courseId:string, username: string,mentorUsername :string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'INSTRUCTOR') {
      throw new Error('Unauthorized to update mentor');
    }
    const enrolledUser = await db.enrolledUsers.findFirst ({
      where: {
          courseId,
          username,        
      },
    });

    if (!enrolledUser) {
      throw new Error('User is not enrolled in the course');
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
    
  } catch (error : any) {
    throw new Error(`Failed to update mentor: ${error.message}`);
  }
}
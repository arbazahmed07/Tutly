import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import { getMentorCourses } from "./courses";
const currentUser = await getCurrentUser();
export const getUserDoubtsByCourseId = async (courseId: string) => {
  if (!currentUser) return null;
  const doubts = await db.doubt.findMany({
    where: {
      courseId: courseId,
    },
    include: {
      user: true,
      course: true,
      response: {
        include: {
          user: true,
        },
      },
    },
  });
  return doubts;
};

//get all doubts based on enrolled courses for user
export const getEnrolledCoursesDoubts = async () => {
  if (!currentUser) return null;
  
  const courses = await db.course.findMany({
    where: {
      enrolledUsers:{
        some:{
          userId:currentUser.id
        }
      }
    },
    include:{
      doubts:{
        include:{
          user:true,
          response:{
            include:{
              user:true
            }
          }
        }
      }
    }
  });
  return courses;
}

//get all doubts based on created courses for user (instructor)
export const getCreatedCoursesDoubts = async () => {
  if (!currentUser) return null;
  const courses = await db.course.findMany({
    where:{
      createdById:currentUser.id
    },
    include:{
      doubts:{
        include:{
          user:true,
          response:{
            include:{
              user:true
            }
          }
        }
      }
    }
  });
  return courses;
}

//get all doubts for mentor
export const getAllDoubtsForMentor = async () => {
  if (!currentUser) return null;
  const mentorCourses = await getMentorCourses();
  if (!mentorCourses) return null;
  const courses = await db.course.findMany({
    where:{
      id:{
        in:mentorCourses.map((course)=>course.id)
      }
    },
    include:{
      doubts:{
        include:{
          user:true,
          response:{
            include:{
              user:true
            }
          }
        }
      }
    }
  });
  return courses;
}

export const createDoubt = async (
  courseId: string,
  title?: string,
  description?: string
) => {

  if (!currentUser) return null;
  const doubt = await db.doubt.create({
    data: {
      courseId: courseId,
      userId: currentUser.id,
      title: title,
      description: description,
    },
    include: {
      user: true,
      course: true,
      response: {
        include: {
          user: true,
        },
      },
    },
  });
  return doubt;
};

//for user/mentor/instructor to create response for user doubts , even user can create response for his own doubts(like commenting)
export const createResponse = async (doubtId: string, description: string) => {
  if (!currentUser) return null;

  const response = await db.response.create({
    data: {
      doubtId: doubtId,
      userId: currentUser.id,
      description: description,
    },
    include: {
      user : true
    }
  });
  return response;
};

//for user to delete his own doubts
export const deleteDoubt = async (doubtId: string) => {
  if (!currentUser) return null;
  const doubt = await db.doubt.delete({
    where: {
      id: doubtId,
      userId: currentUser.id,
    },
    include: {
      user: true,
      course: true,
      response: {
        include: {
          user: true,
        },
      },
    },
  });
  return doubt;
};

//for mentor/instructor to delete any doubts
export const deleteAnyDoubt = async (doubtId: string) => {
  if (!currentUser) return null;
  const doubt = await db.doubt.delete({
    where: {
      id: doubtId,
    },
    include: {
      user: true,
      course: true,
      response: {
        include: {
          user: true,
        },
      },
    },
  });
  return doubt;
};

//for user to delete his own response
export const deleteResponse = async (responseId: string) => {
  if (!currentUser) return null;
  const response = await db.response.delete({
    where: {
      id: responseId,
    },
  });
  return response;
};


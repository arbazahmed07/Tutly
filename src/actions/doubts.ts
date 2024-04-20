import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

//for user doubts in class tab
export const getUserDoubtsByClassId = async (classId: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  const doubts = await db.doubt.findMany({
    where: {
      classId: classId,
      userId: currentUser.id,
    },
    include: {
      user: true,
      class: true,
      response: {
        include: {
          user: true,
        },
      },
    },
  });
  return doubts;
};

//for instructor to display all user douts in class tab
export const getAllDoubtsByClassId = async (classId: string) => {
  const doubts = await db.doubt.findMany({
    where: {
      classId: classId,
    },
    include: {
      user: true,
      class: true,
      response: {
        include: {
          user: true,
        },
      },
    },
  });
  return doubts;
};

//for mentor to display all assigned users douts in class tab
export const getAllDoubtsByClassIdForMentor = async (classId: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const doubts = await db.doubt.findMany({
    where: {
      classId: classId,
      user: {
        assignedMentors: {
          some: {
            mentorId: currentUser.id,
          },
        },
      },
    },
    include: {
      user: true,
      class: true,
      response: {
        include: {
          user: true,
        },
      },
    },
  });
  return doubts;
};

//get all doubts for instructor in a course
export const getAllDoubtsByCourseId = async (courseId: string) => {
  const doubts = await db.doubt.findMany({
    where: {
      class: {
        courseId: courseId,
      },
    },
    include: {
      user: true,
      class: true,
      response: {
        include: {
          user: true,
        },
      },
    },
  });
  return doubts;
};

//get all doubts for mentor in a course
export const getAllDoubtsByCourseIdForMentor = async (courseId: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const doubts = await db.doubt.findMany({
    where: {
      class: {
        courseId: courseId,
      },
      user: {
        assignedMentors: {
          some: {
            mentorId: currentUser.id,
          },
        },
      },
    },
    include: {
      user: true,
      class: true,
      response: {
        include: {
          user: true,
        },
      },
    },
  });
  return doubts;
};

//for user doubts in doubt tab
export const createDoubt = async (
  classId: string,
  title?: string,
  description?: string
) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  const doubt = await db.doubt.create({
    data: {
      classId: classId,
      userId: currentUser.id,
      title: title,
      description: description,
    },
  });
  return doubt;
};

//for mentor/instructor to create response for user doubts , even user can create response for his own doubts(like commenting)
export const createResponse = async (doubtId: string, description: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  
  const response = await db.response.create({
    data: {
      doubtId: doubtId,
      userId: currentUser.id,
      description: description,
    },
  });
  return response;
};

//for user to delete his own doubts
export const deleteDoubt = async (doubtId: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  const doubt = await db.doubt.delete({
    where: {
      id: doubtId,
      userId: currentUser.id,
    },
  });
  return doubt;
};

//for mentor/instructor to delete any doubts
export const deleteAnyDoubt = async (doubtId: string) => {
  const doubt = await db.doubt.delete({
    where: {
      id: doubtId,
    },
  });
  return doubt;
};

import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import { getEnrolledCoursesById } from "./courses";

export const getAllAssignedAssignments = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const coursesWithAssignments = await db.course.findMany({
    where: {
      enrolledUsers: {
        some: {
          userId: currentUser.id,
        },
      },
    },
    select: {
      id: true,
      classes: {
        select: {
          attachments: {
            where: {
              attachmentType: "ASSIGNMENT",
            },
            include: {
              class: true,
              submissions: {
                where: {
                  enrolledUserId: currentUser.id,
                },
              },
            },
          },
        },
      },
    },
  });
  return coursesWithAssignments;
};


export const getAllAssignedAssignmentsByUserId = async (id :string) => {

  const courses = await getEnrolledCoursesById(id);

  const coursesWithAssignments = await db.course.findMany({
      where: {
          enrolledUsers: {
            some: {
              userId: id,
            },
          },
        },
    select: {
      id: true,
      classes: {
        select: {
          attachments: {
            where: {
              attachmentType: "ASSIGNMENT",
            },
            include: {
              class: true,
              submissions: {
                where:{
                  enrolledUser:{
                    userId : id
                  }
                },
                include:{
                  points:true
                }
              } 
            },
          },
        },
      },
    },
  });
  return {courses,coursesWithAssignments};
};


export const getAllMentorAssignments = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const coursesWithAssignments = await db.course.findMany({
    where: {
      enrolledUsers: {
        some: {
          assignedMentors: {
            some: {
              mentorId: currentUser.id,
            },
          }
        },
      },
    },
    select: {
      id: true,
      classes: {
        select: {
          attachments: {
            where: {
              attachmentType: "ASSIGNMENT",
            },
            include: {
              class: true,
              submissions: {
                where: {
                  enrolledUserId: currentUser.id,
                },
              },
            },
          },
        },
      },
    },
  });
  return coursesWithAssignments;
};

export const getAssignmentDetailsById = async (id: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const assignment = await db.attachment.findUnique({
    where: {
      id,
    },
    include: {
      class: {
        include: {
          course: true,
        },
      },
      submissions: {
        where: {
          enrolledUserId: currentUser.id,
        },
        include: {
          enrolledUser: {
            include: {
              course: true,
              assignedMentors: true,
              submission: true,
              user: true,
            },
          },
          points: true,
        },
      },
    },
  });
  return assignment;
};

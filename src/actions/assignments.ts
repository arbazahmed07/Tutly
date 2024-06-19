import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import {
  getCreatedCourses,
  getEnrolledCoursesById,
  getEnrolledCoursesByUsername,
  getMentorCourses,
} from "./courses";
import { orderBy } from "lodash";

export const getAllAssignedAssignments = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser?.username) {
    return null;
  }

  const coursesWithAssignments = await db.course.findMany({
    where: {
      enrolledUsers: {
        some: {
          username: currentUser.username,
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
                  enrolledUser: {
                    username: currentUser.username,
                  },
                },
                include: {
                  points: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  return coursesWithAssignments;
};

export const getAllAssignedAssignmentsByUserId = async (id: string) => {
  const courses = await getEnrolledCoursesByUsername(id);

  const coursesWithAssignments = await db.course.findMany({
    where: {
      enrolledUsers: {
        some: {
          user: {
            username: id,
          },
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
                  enrolledUser: {
                    user: {
                      username: id,
                    },
                  },
                },
                include: {
                  points: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  return { courses, coursesWithAssignments } as any;
};

// for all mentor assignments only for assignments dashboard
export const getAllAssignmentsForMentor = async () => {
  const courses = await getMentorCourses();
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const coursesWithAssignments = await db.course.findMany({
    where: {
      enrolledUsers: {
        some: {
          mentorUsername: currentUser.username,
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
              submissions: {
                some: {
                  enrolledUser: {
                    mentorUsername: currentUser.username,
                  },
                },
              },
            },
            include: {
              class: true,
              submissions: {
                where: {
                  enrolledUser: {
                    mentorUsername: currentUser.username,
                  },
                },
                include: {
                  points: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return { courses, coursesWithAssignments } as any;
};
export const getAllAssignmentsForInstructor = async () => {
  const courses = await getCreatedCourses();
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const coursesWithAssignments = await db.course.findMany({
    where: {
      createdById: currentUser.id,
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
                include: {
                  points: true,
                },
              },
            },
          },
        },
        orderBy:{
          createdAt: "asc"
        }
      },
    },
  });
  return { courses, coursesWithAssignments } as any;
};
export const getAllAssignedAssignmentsForMentor = async (id: string) => {
  const courses = await getEnrolledCoursesById(id);
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const coursesWithAssignments = await db.course.findMany({
    where: {
      enrolledUsers: {
        some: {
          mentorUsername: currentUser.username,
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
                  enrolledUser: {
                    user: {
                      id: id,
                    },
                  },
                },
                include: {
                  points: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return { courses, coursesWithAssignments } as any;
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
          mentorUsername: currentUser.username,
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
            select: {
              title: true,
              submissions: {
                where: {
                  enrolledUser: {
                    mentorUsername: currentUser.username,
                  },
                },
                select: {
                  points: true,
                  enrolledUser: {
                    include: {
                      user: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const submissions = await db.submission.findMany({
    where: {
      enrolledUser: {
        mentorUsername: currentUser.username,
      },
    },
    select: {
      points: true,
      enrolledUser: {
        include: {
          user: true,
        },
      },
    },
  });

  return { coursesWithAssignments, submissions } as any;
};

export const getAllCreatedAssignments = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const coursesWithAssignments = await db.course.findMany({
    where: {
      createdById: currentUser.id,
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

export const getAssignmentDetailsByUserId = async (
  id: string,
  userId: string
) => {
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
          enrolledUser: {
            user: {
              id: userId,
            },
          },
        },
        include: {
          enrolledUser: {
            include: {
              submission: true,
            },
          },
          points: true,
        },
      },
    },
  });
  return assignment;
};

export const getAllAssignmentDetailsBy = async (id: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
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
          enrolledUser: {
            mentorUsername: currentUser.username,
          },
        },
        include: {
          enrolledUser: {
            include: {
              submission: true,
            },
          },
          points: true,
        },
      },
    },
  });

  const sortedAssignments = assignment?.submissions.sort((a, b) => {
    if (b.enrolledUser.username > a.enrolledUser.username) {
      return -1;
    } else if (b.enrolledUser.username < a.enrolledUser.username) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedAssignments;
};

export const getAllAssignmentDetailsForInstructor = async (id: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const assignment = await db.attachment.findUnique({
    where: {
      id,
    },
    include: {
      class: {
        include: {
          course: {
            where: {
              createdById: currentUser.id,
            },
          },
        },
      },
      submissions: {
        include: {
          enrolledUser: {
            include: {
              submission: true,
            },
          },
          points: true,
        },
      },
    },
  });

  const sortedAssignments = assignment?.submissions.sort((a, b) => {
    if (b.enrolledUser.username > a.enrolledUser.username) {
      return -1;
    } else if (b.enrolledUser.username < a.enrolledUser.username) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedAssignments;
};

export const getAllAssignmentsByCourseId = async (id: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const coursesWithAssignments = await db.course.findMany({
    where: {
      id,
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
                  enrolledUser: {
                    username: currentUser.username,
                  },
                },
              },
            },
          },
        },
        orderBy:{
          createdAt: 'asc'
        }
      },
    },
  });

  return coursesWithAssignments;
};

export const getMentorPieChartData = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }
  let assignments, noOfTotalMentees;
  if (currentUser.role === "MENTOR") {
    assignments = await db.submission.findMany({
      where: {
        enrolledUser: {
          mentorUsername: currentUser.username,
        },
      },
      include: {
        points: true,
      },
    });
    noOfTotalMentees = await db.enrolledUsers.count({
      where: {
        mentorUsername: currentUser.username,
      },
    });
  } else {
    assignments = await db.submission.findMany({
      include: {
        points: true,
      },
    });
    noOfTotalMentees = await db.enrolledUsers.count();
  }
  let assignmentsWithPoints = 0,
    assignmentsWithoutPoints = 0;
  assignments.forEach((assignment) => {
    if (assignment.points.length > 0) {
      assignmentsWithPoints += 1;
    } else {
      assignmentsWithoutPoints += 1;
    }
  });
  const noOfTotalAssignments = await db.attachment.count({
    where: {
      attachmentType: "ASSIGNMENT",
    },
  });
  const notSubmitted =
    noOfTotalAssignments * noOfTotalMentees -
    assignmentsWithPoints -
    assignmentsWithoutPoints;

  return [assignmentsWithPoints, assignmentsWithoutPoints, notSubmitted];
};
export const getMentorPieChartById = async (id: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }
  let assignments = await db.submission.findMany({
    where: {
      enrolledUser: {
        mentorUsername: id,
      },
    },
    include: {
      points: true,
    },
  });
  let noOfTotalMentees = await db.enrolledUsers.count({
    where: {
      mentorUsername: id,
    },
  });
  let assignmentsWithPoints = 0,
    assignmentsWithoutPoints = 0;
  assignments.forEach((assignment) => {
    if (assignment.points.length > 0) {
      assignmentsWithPoints += 1;
    } else {
      assignmentsWithoutPoints += 1;
    }
  });
  const noOfTotalAssignments = await db.attachment.count({
    where: {
      attachmentType: "ASSIGNMENT",
    },
  });
  const notSubmitted =
    noOfTotalAssignments * noOfTotalMentees -
    assignmentsWithPoints -
    assignmentsWithoutPoints;

  return [assignmentsWithPoints, assignmentsWithoutPoints, notSubmitted];
};
export const getSubmissionsForMentorByIdLineChart = async (id: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }
  const submissionCount = await db.attachment.findMany({
    where: {
      attachmentType: "ASSIGNMENT",
    },
    include: {
      submissions: {
        where: {
          enrolledUser: {
            mentorUsername: id,
          },
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  const assignments = <any>[];
  const countForEachAssignment = <any>[];
  submissionCount.forEach((submission, index) => {
    assignments.push(submission.title);
    countForEachAssignment.push(submission.submissions.length);
  });
  return { assignments, countForEachAssignment };
};
export const getSubmissionsForMentorLineChart = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }
  let submissionCount;
  if (currentUser.role === "MENTOR") {
    submissionCount = await db.attachment.findMany({
      where: {
        attachmentType: "ASSIGNMENT",
      },
      include: {
        submissions: {
          where: {
            enrolledUser: {
              mentorUsername: currentUser.username,
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  } else {
    submissionCount = await db.attachment.findMany({
      where: {
        attachmentType: "ASSIGNMENT",
      },
      include: {
        submissions: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }
  const assignments = <any>[];
  const countForEachAssignment = <any>[];
  submissionCount.forEach((submission, index) => {
    assignments.push(submission.title);
    countForEachAssignment.push(submission.submissions.length);
  });
  return { assignments, countForEachAssignment };
};

export const getStudentEvaluatedAssigments = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }
  let assignments = await db.submission.findMany({
    where: {
      enrolledUser: {
        username: currentUser.username,
      },
    },
    include: {
      points: true,
    },
  });
  let totalPoints = 0;
  const tem = assignments;
  assignments = assignments.filter(
    (assignment) => assignment.points.length > 0
  );
  const underReview = tem.length - assignments.length;
  assignments.forEach((assignment) => {
    assignment.points.forEach((point) => {
      totalPoints += point.score;
    });
  });
  const noOfTotalAssignments = await db.attachment.count({
    where: {
      attachmentType: "ASSIGNMENT",
    },
  });
  return {
    evaluated: assignments.length,
    underReview: underReview,
    unsubmitted: noOfTotalAssignments - assignments.length - underReview,
    totalPoints: totalPoints,
  };
};
export const getStudentEvaluatedAssigmentsForMentor = async (id: any) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }
  let assignments = await db.submission.findMany({
    where: {
      enrolledUser: {
        username: id,
      },
    },
    include: {
      points: true,
    },
  });
  let totalPoints = 0;
  const tem = assignments;
  assignments = assignments.filter(
    (assignment) => assignment.points.length > 0
  );
  const underReview = tem.length - assignments.length;
  assignments.forEach((assignment) => {
    assignment.points.forEach((point) => {
      totalPoints += point.score;
    });
  });
  const noOfTotalAssignments = await db.attachment.count({
    where: {
      attachmentType: "ASSIGNMENT",
    },
  });
  return {
    evaluated: assignments.length || 0,
    underReview: underReview,
    unsubmitted: noOfTotalAssignments - assignments.length - underReview,
    totalPoints: totalPoints,
  };
};

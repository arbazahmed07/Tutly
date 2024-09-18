import getCurrentUser from "./getCurrentUser";
import { db } from "@/lib/db";
import type {
  submission,
  EnrolledUsers,
  User,
  Point,
  Attachment,
} from "@prisma/client";
import type { InputJsonValue } from "@prisma/client/runtime/library";

interface AssignmentDetails {
  id: string;
  maxSubmissions: number;
  class: {
    courseId: string;
  };
}

interface MentorDetails {
  mentor: {
    username: string;
  };
}

export const createSubmission = async (
  assignmentDetails: AssignmentDetails,
  files: InputJsonValue,
  mentorDetails: MentorDetails,
) => {
  const user = await getCurrentUser();
  if (!user) {
    return { message: "unauthorized" };
  }

  const submissions = await db.submission.findMany({
    where: {
      attachmentId: assignmentDetails.id,
      enrolledUser: {
        username: user.username,
      },
    },
  });

  if (submissions.length >= assignmentDetails.maxSubmissions) {
    return { message: "Maximum submission limit reached" };
  }

  const enrolledUser = await db.enrolledUsers.findUnique({
    where: {
      username_courseId_mentorUsername: {
        username: user.username,
        courseId: assignmentDetails.class.courseId,
        mentorUsername: mentorDetails.mentor.username,
      },
    },
  });
  if (!enrolledUser) return null;

  const submission = await db.submission.create({
    data: {
      attachmentId: assignmentDetails.id,
      enrolledUserId: enrolledUser.id,
      data: files,
    },
  });

  await db.events.create({
    data: {
      eventCategory: "ASSIGNMENT_SUBMISSION",
      causedById: user.id,
      eventCategoryDataId: submission.id,
    },
  });

  return submission;
};

export const addOverallFeedback = async (
  submissionId: string,
  feedback: string,
) => {
  const user = await getCurrentUser();
  if (!user) {
    return { message: "unauthorized" };
  }

  const submission = await db.submission.findUnique({
    where: {
      id: submissionId,
    },
  });

  if (!submission) {
    return { message: "submission not found" };
  }

  const updatedSubmission = await db.submission.update({
    where: {
      id: submissionId,
    },
    data: {
      overallFeedback: feedback,
    },
  });

  return updatedSubmission;
};

interface SubmissionWithDetails extends submission {
  enrolledUser: EnrolledUsers & {
    user: User;
  };
  points: Point[];
  assignment: Attachment;
  submissionCount?: number;
  submissionIndex?: number;
}

export const getAssignmentSubmissions = async (assignmentId: string) => {
  const user = await getCurrentUser();
  if (!user || user.role === "STUDENT") {
    return null;
  }

  const assignment = await db.attachment.findUnique({
    where: {
      id: assignmentId,
    },
  });

  const submissions = await db.submission.findMany({
    where: {
      attachmentId: assignmentId,
    },
    include: {
      enrolledUser: {
        include: {
          user: true,
        },
      },
      points: true,
      assignment: true,
    },
    orderBy: {
      enrolledUser: {
        username: "asc",
      },
    },
  });

  let filteredSubmissions: SubmissionWithDetails[] = [];

  if (user.role === "INSTRUCTOR") {
    filteredSubmissions = submissions;
  }

  if (user.role === "MENTOR") {
    filteredSubmissions = submissions.filter(
      (submission) => submission.enrolledUser.mentorUsername === user.username,
    );
  }

  if (assignment?.maxSubmissions && assignment.maxSubmissions > 1) {
    const submissionCount = await db.submission.groupBy({
      by: ["enrolledUserId"],
      where: {
        attachmentId: assignmentId,
      },
      _count: {
        id: true,
      },
    });

    filteredSubmissions.forEach((submission) => {
      const submissionCountData = submissionCount.find(
        (data) => data.enrolledUserId === submission.enrolledUserId,
      );
      if (submissionCountData) {
        submission.submissionCount = submissionCountData._count.id;
      }
    });

    filteredSubmissions.forEach((submission) => {
      submission.submissionIndex = 1;
      if (submission.submissionCount && submission.submissionCount > 1) {
        const submissionIndex =
          submissions
            .filter((sub) => sub.enrolledUserId === submission.enrolledUserId)
            .findIndex((sub) => sub.id === submission.id) || 0;
        submission.submissionIndex = submissionIndex + 1;
      }
    });
  }

  return filteredSubmissions;
};

export const getSubmissionById = async (submissionId: string) => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  const submission = await db.submission.findUnique({
    where: {
      id: submissionId,
    },
    include: {
      enrolledUser: true,
      points: true,
    },
  });

  if (!submission && submissionId) {
    return null;
  }

  return submission;
};

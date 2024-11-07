import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

export interface ReportData {
  username: string;
  name: string | null;
  submissionLength: number;
  assignmentLength: number;
  score: number;
  submissionEvaluatedLength: number;
  attendance: string;
  mentorUsername: string | null;
}

export const generateReport = async (
  courseId: string,
): Promise<ReportData[]> => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser?.role === "STUDENT") {
    throw new Error("You are not authorized to generate report");
  }

  const enrolledUsers = await db.enrolledUsers.findMany({
    where: {
      courseId: courseId,
      user: {
        role: "STUDENT",
      },
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  let submissions = await db.submission.findMany({
    where: {
      enrolledUser: {
        courseId: courseId,
      },
    },
    select: {
      id: true,
      attachmentId: true,
      enrolledUser: {
        select: {
          username: true,
          user: {
            select: {
              name: true,
            },
          },
          mentorUsername: true,
        },
      },
    },
  });

  if (currentUser?.role === "MENTOR") {
    submissions = submissions.filter(
      (submission) =>
        submission.enrolledUser.mentorUsername === currentUser.username,
    );
  }

  const attendance = await db.attendance.findMany({
    where: {
      attended: true,
      class: {
        courseId: courseId
      }
    },
    select: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  const groupedAttendance = attendance.reduce(
    (acc: Record<string, number>, curr) => {
      const username = curr.user.username;
      acc[username] = (acc[username] ?? 0) + 1;
      return acc;
    },
    {},
  );

  const totalClasses = await db.class.count({
    where: {
      courseId: courseId
    }
  });

  const obj: Record<
    string,
    {
      username: string;
      name: string | null;
      submissions: Set<string>;
      submissionsLength: number;
      assignments: Set<string>;
      assignmentLength: number;
      mentorUsername: string | null;
      score?: number;
      submissionEvaluatedLength?: number;
      attendance?: number;
    }
  > = {};

  enrolledUsers.forEach((enrolledUser) => {
    obj[enrolledUser.username] = {
      username: enrolledUser.username,
      name: enrolledUser.user.name,
      submissions: new Set(),
      submissionsLength: 0,
      assignments: new Set(),
      assignmentLength: 0,
      mentorUsername: enrolledUser.mentorUsername,
    };
  });

  submissions.forEach((submission) => {
    const userObj = obj[submission.enrolledUser.username];
    if (userObj) {
      userObj.submissions.add(submission.id);
      userObj.submissionsLength++;
      if (submission.attachmentId) {
        userObj.assignments.add(submission.attachmentId);
      }
      userObj.assignmentLength = userObj.assignments.size;
      userObj.mentorUsername = submission.enrolledUser.mentorUsername;
    }
  });

  const points = await db.point.findMany({
    where: {
      submissions: {
        enrolledUser: {
          courseId: courseId
        }
      }
    },
    select: {
      score: true,
      submissions: {
        select: {
          id: true,
          enrolledUser: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });

  Object.values(obj).forEach((ob) => {
    try {
      const userPoints = points.filter((point) =>
        point.submissions
          ? point.submissions.enrolledUser.username === ob.username
          : false,
      );
      ob.score = userPoints.reduce((acc, curr) => acc + (curr.score || 0), 0);
      ob.submissionEvaluatedLength = new Set(
        userPoints
          .map((point) => point.submissions?.id)
          .filter((id): id is string => id !== undefined),
      ).size;
    } catch (e) {
      console.log(ob.username);
    }
  });

  Object.values(obj).forEach((ob) => {
    if (!groupedAttendance[ob.username]) {
      groupedAttendance[ob.username] = 0;
    }
    ob.attendance =
      ((groupedAttendance[ob.username] ?? 0) * 100) / totalClasses;
  });

  let SelectedFields: ReportData[] = Object.values(obj).map((ob) => ({
    username: ob.username,
    name: ob.name,
    submissionLength: ob.submissionsLength,
    assignmentLength: ob.assignmentLength,
    score: ob.score ?? 0,
    submissionEvaluatedLength: ob.submissionEvaluatedLength ?? 0,
    attendance: ob.attendance?.toFixed(2) ?? "0.00",
    mentorUsername: ob.mentorUsername ?? "",
  }));

  SelectedFields.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
  SelectedFields.sort((a, b) => b.score - a.score);
  SelectedFields.sort((a, b) =>
    (a.mentorUsername ?? "").localeCompare(b.mentorUsername ?? ""),
  );

  if (currentUser?.role === "MENTOR") {
    SelectedFields = SelectedFields.filter(
      (selectedField) => selectedField.mentorUsername === currentUser.username,
    );
  }

  return SelectedFields;
};

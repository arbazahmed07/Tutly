import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

export const generateReport = async (courseId: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser?.role === "STUDENT") {
    throw new Error("You are not authorized to generate report");
  }

  let enrolledUsers = await db.enrolledUsers.findMany({
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
        submission.enrolledUser.mentorUsername === currentUser.username
    );
  }

  const attendance = await db.attendance.findMany({
    where: {
      attended: true,
    },
    select: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  const groupedAttendance = attendance.reduce((acc: any, curr) => {
    const username = curr.user.username;
    acc[username] = (acc[username] || 0) + 1;
    return acc;
  }, {});

  const totalClasses = await db.class.count();

  const obj: any = {};

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
    obj[submission.enrolledUser.username].submissions.add(submission.id);
    obj[submission.enrolledUser.username].submissionsLength++;
    obj[submission.enrolledUser.username].assignments.add(
      submission.attachmentId
    );
    obj[submission.enrolledUser.username].assignmentLength =
      obj[submission.enrolledUser.username].assignments.size;
    obj[submission.enrolledUser.username].mentorUsername =
      submission.enrolledUser.mentorUsername;
  });

  const points = await db.point.findMany({
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

  Object.values(obj).forEach((ob: any) => {
    try {
      const userPoints = points.filter((point) =>
        point.submissions
          ? point.submissions.enrolledUser.username === ob.username
          : false
      );
      ob.score = userPoints.reduce((acc, curr) => acc + curr.score, 0);
      ob.submissionEvaluatedLength = new Set(
        userPoints.map((point) => point.submissions?.id)
      ).size;
    } catch (e) {
      console.log(ob.username);
    }
  });

  Object.values(obj).forEach((ob: any) => {
    if(!groupedAttendance[ob.username]) {
      groupedAttendance[ob.username] = 0;
    }
    ob.attendance = (groupedAttendance[ob.username] * 100) / totalClasses;
  });

  let SelectedFields = Object.values(obj).map((ob: any) => {
    return {
      username: ob.username,
      name: ob.name,
      submissionLength: ob.submissionsLength,
      assignmentLength: ob.assignmentLength,
      score: ob.score,
      submissionEvaluatedLength: ob.submissionEvaluatedLength,
      attendance: ob.attendance.toFixed(2),
      mentorUsername: ob.mentorUsername,
    };
  });

  SelectedFields.sort((a, b) => a.name.localeCompare(b.name));
  SelectedFields.sort((a, b) => b.score - a.score);
  SelectedFields.sort((a, b) =>
    a.mentorUsername.localeCompare(b.mentorUsername)
  );

  if (currentUser?.role === "MENTOR") {
    SelectedFields = SelectedFields.filter(
      (selectedField) => selectedField.mentorUsername === currentUser.username
    );
  }

  return SelectedFields;
};

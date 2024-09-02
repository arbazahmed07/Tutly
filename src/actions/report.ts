import { db } from "@/lib/db";

export const generateReport = async (courseId: string) => {
  const submissions = await db.submission.findMany({
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

  submissions.forEach((submission) => {
    if (!obj[submission.enrolledUser.username]) {
      obj[submission.enrolledUser.username] = {
        username: submission.enrolledUser.username,
        name: submission.enrolledUser.user.name,
        submissions: new Set([submission.id]),
        submissionsLength: 1,
        assignments: new Set([submission.attachmentId]),
        assignmentLength: 1,
        mentorUsername: submission.enrolledUser.mentorUsername,
      };
    } else {
      obj[submission.enrolledUser.username].submissions.add(submission.id);
      obj[submission.enrolledUser.username].submissionsLength++;
      obj[submission.enrolledUser.username].assignments.add(
        submission.attachmentId
      );
      obj[submission.enrolledUser.username].assignmentLength =
        obj[submission.enrolledUser.username].assignments.size;
      obj[submission.enrolledUser.username].mentorUsername =
        submission.enrolledUser.mentorUsername;
    }
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
    ob.attendance = (groupedAttendance[ob.username] * 100) / totalClasses;
  });

  const SelectedFields = Object.values(obj).map((ob: any) => {
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

  return SelectedFields;
};

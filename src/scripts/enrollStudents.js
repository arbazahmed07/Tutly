import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { writeFileSync } from "fs";
const db = new PrismaClient();

async function main() {
  const submissions = await db.submission.findMany({
    where: {
      enrolledUser: {
        courseId: "0878eafa-880d-4cea-b647-e1656df1cc9d",
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

  const groupedAttendance = attendance.reduce((acc, curr) => {
    const username = curr.user.username;
    acc[username] = (acc[username] || 0) + 1;
    return acc;
  }, {});

  const totalClasses = await db.class.count();

  const obj = {};

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
        submission.attachmentId,
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

  Object.values(obj).forEach((ob) => {
    try {
      const userPoints = points.filter((point) =>
        point.submissions
          ? point.submissions.enrolledUser.username === ob.username
          : false,
      );
      ob.score = userPoints.reduce((acc, curr) => acc + curr.score, 0);
      ob.submissionEvaluatedLength = new Set(
        userPoints.map((point) => point.submissions.id),
      ).size;
    } catch (e) {
      console.log(ob.username);
    }
  });

  Object.values(obj).forEach((ob) => {
    ob.attendance = (groupedAttendance[ob.username] * 100) / totalClasses;
  });

  const SelectedFields = Object.values(obj).map((ob) => {
    return {
      username: ob.username,
      name: ob.name,
      submissionLength: ob.submissionsLength,
      assignmentLength: ob.assignmentLength,
      score: ob.score,
      submissionEvaluatedLength: ob.submissionEvaluatedLength,
      attendance: ob.attendance,
      mentorUsername: ob.mentorUsername,
    };
  });

  SelectedFields.sort((a, b) => a.name.localeCompare(b.name));
  SelectedFields.sort((a, b) => b.score - a.score);
  SelectedFields.sort((a, b) =>
    a.mentorUsername.localeCompare(b.mentorUsername),
  );

  // filter assignments length >= 28  or submissions length >= 30
  const filteredUsers = Object.values(SelectedFields).filter(
    (ob) => ob.assignmentLength >= 28 || ob.submissionLength >= 30,
  );

  console.log(filteredUsers.length);

  const csv = Object.values(SelectedFields).map((ob) => {
    return `${ob.username},${ob.name},${ob.submissionLength},${
      ob.assignmentLength
    },${ob.score},${ob.submissionEvaluatedLength},${ob.attendance},${
      ob.mentorUsername
    }`;
  });

  const csvHeader =
    "username,name,submissionLength,assignmentLength,score,submissionEvaluatedLength,attendance,mentorUsername";

  const currentDateTime = dayjs().format("YYYY-MM-DD-HH-mm-ss");
  writeFileSync(
    `user-stats-${currentDateTime}.csv`,
    csvHeader + "\n" + csv.join("\n"),
  );

  const enrolledUsers = await db.enrolledUsers.createMany({
    data: Object.values(filteredUsers).map((ob) => {
      return {
        courseId: "8580a8d0-cfe1-4bba-b6a3-b74012eb515d",
        mentorUsername: ob.mentorUsername,
        username: ob.username,
      };
    }),
    skipDuplicates: true,
  });

}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });

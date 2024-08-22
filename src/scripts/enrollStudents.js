const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  const submissions = await db.submission.findMany({
    where: {
      enrolledUser: {
        courseId: "0878eafa-880d-4cea-b647-e1656df1cc9d",
        mentorUsername: "22071A05H3",
      },
    },
    select: {
      id: true,
      attachmentId: true,
      enrolledUser:{
        select:{
          username:true
        }
      }
    },
  });

  // create a object of {username : username , submissions: number , assignments: number(count of unique assignments from submissions)}
  const obj = {};

  submissions.forEach((submission) => {
    if (!obj[submission.enrolledUser.username]) {
      obj[submission.enrolledUser.username] = {
        username: submission.enrolledUser.username,
        submissions: new Set([submission.id]),
        submissionsLength: 1,
        assignments: new Set([submission.attachmentId]),
        assignmentLength: 1,
      };
    } else {
      obj[submission.enrolledUser.username].submissions.add(submission.id);
      obj[submission.enrolledUser.username].submissionsLength++;
      obj[submission.enrolledUser.username].assignments.add(submission.attachmentId);
      obj[submission.enrolledUser.username].assignmentLength = obj[submission.enrolledUser.username].assignments.size;
    }
  });

  // print as a table of only this 3 fields username , submissionLength , assignmentLength from obj object
  const ThreeFields = Object.values(obj).map((ob) => {
    return {
      username: ob.username,
      submissionLength: ob.submissionsLength,
      assignmentLength: ob.assignmentLength,
    };
  });

  // sort by number of assignments
  ThreeFields.sort((a, b) => b.assignmentLength - a.assignmentLength);

  console.table(Object.values(ThreeFields));
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

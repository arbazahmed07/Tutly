const { PrismaClient } = require("@prisma/client");

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
      enrolledUser:{
        select:{
          username:true,
          user:{
            select:{
              name:true
            }
          },
          mentorUsername:true
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
      obj[submission.enrolledUser.username].assignments.add(submission.attachmentId);
      obj[submission.enrolledUser.username].assignmentLength = obj[submission.enrolledUser.username].assignments.size;
      obj[submission.enrolledUser.username].mentorUsername = submission.enrolledUser.mentorUsername;
    }
  });

  // print as a table of only this 3 fields username , submissionLength , assignmentLength from obj object
  const SelectedFields = Object.values(obj).map((ob) => {
    return {
      username: ob.username,
      name: ob.name,
      submissionLength: ob.submissionsLength,
      assignmentLength: ob.assignmentLength,
      mentorUsername: ob.mentorUsername,
    };
  });

  // sort by number of assignments
  SelectedFields.sort((a, b) => a.name.localeCompare(b.name));
  SelectedFields.sort((a, b) => a.submissionLength - b.submissionLength);
  SelectedFields.sort((a, b) => b.assignmentLength - a.assignmentLength);
  SelectedFields.sort((a, b) => a.mentorUsername.localeCompare(b.mentorUsername));

  console.table(Object.values(SelectedFields));

  // filter assignments length >= 28  or submissions length >= 30
  const filteredUsers = Object.values(SelectedFields).filter((ob) => ob.assignmentLength >= 28 || ob.submissionLength >=30);

  console.log(filteredUsers.length)

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

  console.log(enrolledUsers);

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

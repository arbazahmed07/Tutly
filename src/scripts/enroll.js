import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  const existingCourseUsers = await db.enrolledUsers.findMany({
    where: {
      courseId: "0878eafa-880d-4cea-b647-e1656df1cc9d",
    },
    select: {
      username: true,
      mentorUsername: true,
    },
  });

  const newCourseUsers = {};
  existingCourseUsers.forEach((existingCourseUser) => {
    newCourseUsers[existingCourseUser.username] = existingCourseUser;
  });

  const newCourseUsersArray = Object.values(newCourseUsers).filter(
    (ob) => ob.mentorUsername && ob.username,
  );

  console.log(newCourseUsersArray.length);

  const enrolledUsers = await db.enrolledUsers.createMany({
    data: newCourseUsersArray.map((ob) => {
      return {
        courseId: "6bc9903c-43aa-45ac-b187-cf7d16129e9f",
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

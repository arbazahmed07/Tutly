const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  const students = await db.submission.findMany({
    where: {
      enrolledUser: {
        courseId: "0878eafa-880d-4cea-b647-e1656df1cc9d",
        mentorUsername: "22071A05E3",
      },
    },
    distinct: ["attachmentId", "enrolledUserId"],
    select: {
      attachmentId: true,
      enrolledUserId: true,
    },
  });

  console.log(students.length);
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

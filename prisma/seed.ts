const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  const submissions = await db.submission.findMany({
    where: {
      attachmentId: "",
      enrolledUser: {
        mentorUsername: "",
      },
    },
  });

  const points = submissions.map((submission: any) => {
    return {
      submissionId: submission.id,
      score: 10,
      category: "OTHER",
    };
  });

  const insertedPoints = await db.point.createMany({
    data: points,
  });
  console.log({ insertedPoints });
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

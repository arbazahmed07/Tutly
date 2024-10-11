import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const zeroScore = await db.point.findMany({
    where: {
      score: 0,
      category: {
        not: "OTHER",
      },
    },
  });
  console.log(zeroScore);
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

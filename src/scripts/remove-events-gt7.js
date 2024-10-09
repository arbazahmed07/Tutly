const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {

  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);

  const pastEvents = await db.events.deleteMany({
    where: {
      createdAt: {
        lt: sevenDaysAgo,
      },
    },
  });
  console.log(pastEvents);
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

const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  const students = await db.user.findMany({
    select:{
      name:true,
      username:true,
      email:true,
      password:true,

    }
  })
  console.log({ students });
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
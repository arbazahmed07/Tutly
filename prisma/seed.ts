const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  const students = await db.enrolledUsers.createMany({
    data: [
      {
        username: "23071A05F2",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05F3",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05F4",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05F5",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05F6",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05F7",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05F8",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05F9",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05G0",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05G1",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05G2",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05G3",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05G4",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05G5",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05G6",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05G7",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05G8",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05G9",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05H0",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05H1",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05H2",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05H3",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05H4",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05H5",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05H6",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05H7",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05H8",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05H9",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05J0",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05J1",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05J2",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05J3",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05J4",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05J5",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05J6",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05J7",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05J8",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05J9",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05K0",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05K1",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05K2",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05K3",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05K4",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05K5",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05K6",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05K7",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05K8",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05K9",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05M0",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        username: "23071A05M1",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
    ],
  });
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

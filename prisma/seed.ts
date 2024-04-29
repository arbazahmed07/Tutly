const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  const students = await db.assignedMentors.createMany({
    data: [
      {
        enrolledUsername: "23071A05F2",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05F3",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05F4",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05F5",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05F6",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05F7",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05F8",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05F9",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05G0",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05G1",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05G2",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05G3",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05G4",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05G5",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05G6",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05G7",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05G8",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05G9",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05H0",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05H1",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05H2",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05H3",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05H4",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05H5",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05H6",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05H7",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05H8",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05H9",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05J0",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05J1",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05J2",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05J3",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05J4",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05J5",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05J6",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05J7",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05J8",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05J9",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05K0",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05K1",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05K2",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05K3",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05K4",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05K5",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05K6",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05K7",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05K8",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05K9",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05M0",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
        courseId: "5454d2b6-2c2c-4419-88e0-0ad4fe8d0bdb",
      },
      {
        enrolledUsername: "23071A05M1",
        mentorId: "136ebdf9-149f-4f85-8e25-f3b2d94cac0c",
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

const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  const submission = await db.submission.findMany({});
  for (let i = 0; i < submission.length; i++) {
    const submissionData = submission[i].data;
    const newCode = submissionData["/index.html"]["code"];
    if (newCode) {
      continue;
    }

    const htmlCode = submissionData["/index.html"];

    if (
      htmlCode.includes(
        "<!-- Fixes stylesheet issues from the playground upgrade -->",
      )
    ) {
      console.log("Already updated");
      continue;
    }

    submissionData["/index.html"] =
      htmlCode +
      `\n\n <!-- Fixes stylesheet issues from the playground upgrade --> \n <link rel=\"stylesheet\" href=\"styles.css\">`;

    const updatedSubmission = await db.submission.update({
      where: {
        id: submission[i].id,
      },
      data: {
        data: submissionData,
      },
    });

    console.log(updatedSubmission.id);
  }
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

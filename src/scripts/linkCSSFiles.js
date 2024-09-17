import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const submission = await db.submission.findMany({});
  for (const sub of submission) {
    const submissionData = sub.data;
    if (
      !submissionData ||
      typeof submissionData !== "object" ||
      !submissionData["/index.html"]
    ) {
      continue;
    }

    const newCode = submissionData["/index.html"]["code"];
    if (newCode) {
      continue;
    }

    const htmlCode = submissionData["/index.html"];
    if (typeof htmlCode !== "string") {
      continue;
    }

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
        id: sub.id,
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

import { Octokit } from "@octokit/rest";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const octokit = new Octokit({
  auth: "",
});

async function main() {
  const owner = "GoodKodersUnV";
  const repo = "LMS-DATA";

  const submissions = await db.submission.findMany({});

  let progress = 0;

  submissions.map(async (submission) => {
    if (!submission.submissionLink) return null;
    if (submission.data) return null;

    const prNumber = Number(submission.submissionLink.split("/").pop());
    try {
      const { data: pr } = await octokit.request(
        "GET /repos/{owner}/{repo}/pulls/{pull_number}",
        {
          owner,
          repo,
          pull_number: prNumber,
        },
      );

      const { data: filesData } = await octokit.request(
        "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
        {
          owner,
          repo,
          pull_number: prNumber,
        },
      );
      //todo: temp fix
      let basePath = filesData[0].filename.split("/").slice(0, -1).join("/");

      // if package.json is present then take it as basepath
      if (filesData.some((file) => file.filename.includes("package.json"))) {
        const packageJsonFile = filesData.find((file) =>
          file.filename.includes("package.json"),
        );
        if (packageJsonFile) {
          basePath = packageJsonFile.filename.split("/").slice(0, -1).join("/");
        }
      }

      let files = {};

      for (let file of filesData) {
        const response = await octokit.request(
          "GET /repos/{owner}/{repo}/contents/{path}",
          {
            owner,
            repo,
            path: file.filename,
            ref: pr.head.sha,
          },
        );

        const data = response.data;

        const relativePath = file.filename.replace(basePath, "");

        files = {
          ...files,
          [relativePath]: Buffer.from(data.content, "base64").toString("utf-8"),
        };
      }

      await db.submission.update({
        where: {
          id: submission.id,
        },
        data: {
          data: files,
        },
      });

      progress++;

      console.log("Progress: ", progress, "/", submissions.length);

      return files;
    } catch (error) {
      console.error("Error fetching PR files:", error);
    }
  });
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

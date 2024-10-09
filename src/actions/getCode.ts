// used to fetch the code from the PR (deprecarated)

import { Octokit } from "@octokit/core";

export const getSubmission = async (prNumber: number) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PAT,
  });

  const owner = "GoodKodersUnV";
  const repo = "LMS-DATA";

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
    let basePath =
      filesData?.[0]?.filename.split("/").slice(0, -1).join("/") ?? "";

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

    for (const file of filesData) {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner,
          repo,
          path: file.filename,
          ref: pr.head.sha,
        },
      );

      const data: unknown = response.data;

      const relativePath = file.filename.replace(basePath, "");

      if (
        typeof data === "object" &&
        data !== null &&
        "content" in data &&
        typeof data.content === "string"
      ) {
        files = {
          ...files,
          [relativePath]: Buffer.from(data.content, "base64").toString("utf-8"),
        };
      } else {
        console.error(`Unexpected data format for file: ${relativePath}`);
      }
    }

    return files;
  } catch (error) {
    console.error("Error fetching PR files:", error);
  }
};

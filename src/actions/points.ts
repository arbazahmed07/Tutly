import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import type { pointCategory } from "@prisma/client";

export default async function addPoints({
  submissionId,
  marks,
}: {
  submissionId: string;
  marks: {
    category: pointCategory;
    score: number;
  }[];
}) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role == "STUDENT") {
      throw new Error("Unauthorized");
    }
    const allCategories = await Promise.all(
      marks.map(async (mark) => {
        const existingPoint = await db.point.findFirst({
          where: {
            submissionId,
            category: mark.category,
          },
        });

        await db.events.create({
          data: {
            eventCategory: "ASSIGNMENT_EVALUATION",
            causedById: currentUser.id,
            eventCategoryDataId: submissionId,
          },
        });

        if (existingPoint) {
          return await db.point.update({
            where: {
              id: existingPoint.id,
            },
            data: {
              score: mark.score,
            },
          });
        } else {
          return await db.point.create({
            data: {
              submissionId,
              category: mark.category,
              score: mark.score,
            },
          });
        }
      }),
    );

    // await mergeAndDeleteBranch(submissionId);

    return allCategories;
  } catch (error) {
    console.log(error);
    throw new Error("Error in adding points");
  }
}

// const { Octokit } = require("@octokit/rest");

export async function deleteSubmission(submissionId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role == "STUDENT") {
    throw new Error("Unauthorized");
  }

  // const submission = await db.submission.findUnique({
  //     where: {
  //         id: submissionId
  //     }
  // });

  // const octokit = new Octokit({
  //     auth: process.env.GITHUB_PAT,
  // });

  // const owner = "GoodKodersUnV";
  // const repo = "LMS-DATA";
  // const prLink = submission?.submissionLink

  // if (!prLink) {
  //     throw new Error("PR Link not found");
  // }

  // const response = await octokit.pulls.get({
  //     owner,
  //     repo,
  //     pull_number: Number(prLink.split("/").pop())
  // });

  // const pr = response.data;

  // if (!pr.merged) {
  //     await octokit.git.deleteRef({
  //         owner,
  //         repo,
  //         ref: `heads/${pr.head.ref}`
  //     });
  // }

  await db.submission.delete({
    where: {
      id: submissionId,
    },
  });
}

// export async function mergeAndDeleteBranch (submissionId:string){
//     const submission = await db.submission.findUnique({
//         where: {
//             id: submissionId
//         }
//     });

//     const octokit = new Octokit({
//         auth: process.env.GITHUB_PAT,
//       });

//     const owner = "GoodKodersUnV";
//     const repo = "LMS-DATA";
//     const prLink = submission?.submissionLink

//     if (!prLink) {
//         throw new Error("PR Link not found");
//     }

//     const response = await octokit.pulls.get({
//         owner,
//         repo,
//         pull_number: Number(prLink.split("/").pop())
//     });

//     const pr = response.data;

//     if (pr.merged) {
//         return;
//     }

//     await octokit.pulls.merge({
//         owner,
//         repo,
//         pull_number: pr.number
//     });

//     await octokit.git.deleteRef({
//         owner,
//         repo,
//         ref: `heads/${pr.head.ref}`
//     });
// }

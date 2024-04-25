import { db } from "@/lib/db";

export const updatePoints = async (
  submissionId: string,
  score: number,
  category: any
) => {
  const submission = await db.point.upsert({
    where: {
      submissionId_category: {
        submissionId,
        category,
      },
    },
    update: {
      score,
      category,
    },
    create: {
      score,
      category,
      submissionId,
    },
  });
  return submission;
};

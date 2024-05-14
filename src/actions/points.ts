import { db } from "@/lib/db";

export const updatePoints = async (
  submissionId: string,
  score: number,
  category: "RESPOSIVENESS"|"OTHER"|"STYLING"
) => {
  const submission = await db.point.upsert({
    where: {
      submissionId:submissionId,
      submissionId_category: {
        submissionId,
        category,
      },
    },
    update: {
      score,
    },    
    create: {
      score,
      category,
      submissionId,
    },
  });
  return submission;
};

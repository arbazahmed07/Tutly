import { db } from "@/lib/db";

// get all mentors for a course
// export const getMentorsByCourseId = async (courseId: string) => {
//   const mentors = await db.assignedMentors.findMany({
//     where: {
//       enrolledUser: {
//         course: {
//           id: courseId,
//         },
//       },
//     },
//     select: {
//       mentor: {
//         select: {
//           id: true,
//           name: true,
//           email: true,
//           profile: true,
//         },
//       },
//     },
//   });
//   return mentors;
// };
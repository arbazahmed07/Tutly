import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

import { assignmentsRouter } from "./routers/assignments";
import { attachmentsRouter } from "./routers/attachments";
import { attendanceRouter } from "./routers/attendance";
import { bookmarksRouter } from "./routers/bookmarks";
import { classesRouter } from "./routers/classes";
import { codingPlatformsRouter } from "./routers/codingPlatforms";
import { coursesRouter } from "./routers/courses";
import { doubtsRouter } from "./routers/doubts";
import { fileUploadRouter } from "./routers/fileupload";
import { foldersRouter } from "./routers/folders";
import { leaderboardRouter } from "./routers/getLeaderboard";
import { holidaysRouter } from "./routers/holidays";
import { mentorsRouter } from "./routers/mentors";
import { notesRouter } from "./routers/notes";
import { notificationsRouter } from "./routers/notifications";
import { pointsRouter } from "./routers/points";
import { reportRouter } from "./routers/report";
import { resetPasswordRouter } from "./routers/reset-password";
import { scheduleRouter } from "./routers/schedule";
import { statisticsRouter } from "./routers/statistics";
import { submissionRouter } from "./routers/submission";
import { usersRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  assignments: assignmentsRouter,
  attachments: attachmentsRouter,
  attendances: attendanceRouter,
  bookmarks: bookmarksRouter,
  classes: classesRouter,
  codingPlatforms: codingPlatformsRouter,
  courses: coursesRouter,
  doubts: doubtsRouter,
  fileupload: fileUploadRouter,
  folders: foldersRouter,
  leaderboard: leaderboardRouter,
  holidays: holidaysRouter,
  mentors: mentorsRouter,
  notes: notesRouter,
  notifications: notificationsRouter,
  points: pointsRouter,
  report: reportRouter,
  reset_password: resetPasswordRouter,
  schedule: scheduleRouter,
  statistics: statisticsRouter,
  submissions: submissionRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

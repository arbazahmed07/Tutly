import { groupActions } from "@/lib/group";
import * as assignments from "./assignments";
import * as attachments from "./attachments";
import * as attendances from "./attendance";
import * as classes from "./classes";
import * as courses from "./courses";
import * as doubts from "./doubts";
import * as leaderboard from "./getLeaderboard";
import * as events from "./events";
import * as points from "./points";
import * as submissions from "./submission";
import * as report from "./report";
import * as mentors from "./mentors";
import * as users from "./users";
// import * as resend from "./resend";

export const server = {
  ...groupActions("courses", courses, "_"),
  ...groupActions("assignments", assignments, "_"),
  ...groupActions("attachments", attachments, "_"),
  ...groupActions("attendances", attendances, "_"),
  ...groupActions("classes", classes, "_"),
  ...groupActions("doubts", doubts, "_"),
  ...groupActions("leaderboard", leaderboard, "_"),
  ...groupActions("events", events, "_"),
  ...groupActions("points", points, "_"),
  ...groupActions("submissions", submissions, "_"),
  ...groupActions("report", report, "_"),
  ...groupActions("mentors", mentors, "_"),
  ...groupActions("users", users, "_"),
};

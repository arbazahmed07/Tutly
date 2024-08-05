import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import { EventCategory, Events } from "@prisma/client";

export const getAllEvents = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "INSTRUCTOR") return null;

  const events = await db.events.findMany({});

  const userIds = events
    .filter(event => modalMap[event.eventCategory] === "user")
    .map(event => event.causedById)
    .filter((id): id is string => id !== null && id !== undefined);

  const eventCategoryDataIds = events
    .filter(event => event.eventCategoryDataId !== null && event.eventCategoryDataId !== undefined)
    .map(event => event.eventCategoryDataId)
    .filter((id): id is string => id !== null && id !== undefined);

  const users = await db.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, name: true, email: true },
  });

  const causedByUsers = await db.user.findMany({
    where: { id: { in: eventCategoryDataIds } },
    select: { id: true, name: true, email: true },
  });

  const attachments = await db.attachment.findMany({
    where: { id: { in: eventCategoryDataIds } },
    select: { id: true, title: true },
  });

  const classes = await db.class.findMany({
    where: { id: { in: eventCategoryDataIds } },
    select: { id: true, title: true },
  });

  const courses = await db.course.findMany({
    where: { id: { in: eventCategoryDataIds } },
    select: { id: true, enrolledUsers: {
      select: { username: true }
    } },
  });

  const doubts = await db.doubt.findMany({
    where: { id: { in: eventCategoryDataIds } },
    select: { id: true },
  });

  const responses = await db.response.findMany({
    where: { doubtId: { in: eventCategoryDataIds } },
    select: { doubtId: true },
  });

  const submissions = await db.submission.findMany({
    where: { id: { in: eventCategoryDataIds } },
    select: { id: true, assignment: { select: { title: true ,id:true} } , enrolledUser:{ select: { user: {select:{username:true,name:true}} ,mentor: {select:{username:true,name:true}} } } },
  });

  const dataMap: Record<string, any> = {
    user: users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {}),
    attachment: attachments.reduce((acc, attachment) => ({ ...acc, [attachment.id]: attachment }), {}),
    class: classes.reduce((acc, classItem) => ({ ...acc, [classItem.id]: classItem }), {}),
    course: courses.reduce((acc, course) => ({ ...acc, [course.id]: course }), {}),
    doubt: doubts.reduce((acc, doubt) => ({ ...acc, [doubt.id]: doubt }), {}),
    response: responses.reduce((acc, response) => ({ ...acc, [response.doubtId]: response }), {}),
    submission: submissions.reduce((acc, submission) => ({ ...acc, [submission.id]: submission }),{}),
  };

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const message = eventToMessage(event, dataMap);
    events[i].message = message;
    // @ts-ignore
    events[i].causedByUser = causedByUsers.find(user => user.id === event.causedById);
  }

  return events;
};

type dbModals =
  | "user"
  | "profile"
  | "course"
  | "enrolledUsers"
  | "class"
  | "folder"
  | "attendance"
  | "doubt"
  | "response"
  | "video"
  | "attachment"
  | "submission"
  | "point"
  | "account"
  | "session"
  | "events";

const modalMap: Record<EventCategory, dbModals> = {
  ASSIGNMENT_SUBMISSION: "submission",
  ASSIGNMENT_EVALUATION: "submission",
  NEW_USER_GOOGLE_LOGIN: "user",
  USER_GOOGLE_LOGIN: "user",
  USER_CREDENTIAL_LOGIN: "user",
  ATTACHMENT_CREATION: "attachment",
  CLASS_CREATION: "class",
  STUDENT_ENROLLMENT_IN_COURSE: "course",
  DOUBT_CREATION: "doubt",
  DOUBT_RESPONSE: "response",
};

export const eventToMessage = (event: Events, dataMap: Record<string, any>) => {
  const event_type = event.eventCategory;

  const modal = modalMap[event_type];

  if (!modal) return `Unknown event type ${event_type}`;

  const dataKey = event.eventCategoryDataId ?? event.causedById;
  if (!dataKey) return `Unknown event type ${event_type}`;

  const data = dataMap[modal][dataKey];

  if (!data) return `Unknown event type ${event_type} - id: ${dataKey}`;

  switch (event_type) {
    case "NEW_USER_GOOGLE_LOGIN":
    case "USER_GOOGLE_LOGIN":
    case "USER_CREDENTIAL_LOGIN":
      return `User ${data.name} - ${data.email} logged in via ${
        event_type == "USER_CREDENTIAL_LOGIN" ? "credentials" : "Google"
      }`;
    case "ASSIGNMENT_SUBMISSION":
      return `${data.assignment.title} submitted by ${data.enrolledUser.user.name} (${data.enrolledUser.user.username})`;
    case "ASSIGNMENT_EVALUATION":
      return `Submission for ${data.assignment.title} by ${data.enrolledUser.user.name} (${data.enrolledUser.user.username}) evaluated by mentor ${data.enrolledUser.mentor.name} (${data.enrolledUser.mentor.username})`;
    case "ATTACHMENT_CREATION":
      return `Attachment ${data.title} created by ${data.createdBy.name} (${data.createdBy.username})`;
    case "CLASS_CREATION":
      return `Class ${data.title} created by ${data.createdBy.name} (${data.createdBy.username})`;
    case "STUDENT_ENROLLMENT_IN_COURSE":
      return `Student ${data.username} enrolled in course ${data.courseId}`;
    case "DOUBT_CREATION":
      return `Doubt ${data.id} created by ${data.createdBy.name} (${data.createdBy.username})`;
    case "DOUBT_RESPONSE":
      return `Response to doubt ${data.doubtId} created by ${data.createdBy.name} (${data.createdBy.username})`;
    default:
      return `Unknown event type ${event_type}`;
  }
};

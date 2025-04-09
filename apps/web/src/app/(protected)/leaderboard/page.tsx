import { getServerSessionOrRedirect } from "@/lib/auth/session";
import { db } from "@tutly/db";
import Leaderboard from "./_components/leaderboard";

export default async function LeaderboardPage() {
  const session = await getServerSessionOrRedirect();
  const currentUser = session.user;

  const mentor = await db.enrolledUsers.findMany({
    where: {
      username: currentUser.username,
      user: {
        organizationId: currentUser.organizationId,
      },
    },
    select: {
      mentorUsername: true,
    },
  });

  const submissions = await db.submission.findMany({
    where: {
      enrolledUser: {
        mentorUsername: mentor[0]?.mentorUsername ?? null,
      },
    },
    select: {
      id: true,
      points: true,
      assignment: {
        select: {
          class: {
            select: {
              course: {
                select: {
                  id: true,
                  title: true,
                  startDate: true,
                },
              },
            },
          },
        },
      },
      submissionDate: true,
      enrolledUser: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          },
          mentor: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });

  const submissionsUptoLastSunday = submissions.filter((submission) => {
    const submissionDate = new Date(submission.submissionDate);
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    const daysToLastSunday = currentDayOfWeek === 0 ? 7 : currentDayOfWeek;
    const lastSunday = new Date(currentDate);
    lastSunday.setDate(currentDate.getDate() - daysToLastSunday);
    lastSunday.setHours(12, 0, 0, 0);
    return submissionDate < lastSunday;
  });

  const totalPoints = submissionsUptoLastSunday.map((submission) => {
    const totalPoints = submission.points.reduce(
      (acc: number, curr: { score: number | null }) => acc + (curr.score ?? 0),
      0
    );
    return {
      id: submission.id,
      totalPoints,
      submissionDate: submission.submissionDate,
      enrolledUser: {
        user: submission.enrolledUser.user,
        mentor: {
          username: submission.enrolledUser.mentor?.username ?? currentUser.username,
        },
      },
      assignment: {
        class: {
          course: submission.assignment?.class?.course ?? {
            id: "",
            title: "",
            startDate: new Date(),
          },
        },
      },
    }
  });

  const sortedSubmissions = totalPoints.sort((a, b) => b.totalPoints - a.totalPoints);

  const courses = await db.course.findMany({
    where: {
      enrolledUsers: {
        some: {
          username: currentUser.username,
        },
      },
    },
    include: {
      classes: true,
      createdBy: {
        select: {
          id: true,
          username: true,
          name: true,
          image: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      _count: {
        select: {
          classes: true,
        },
      },
      courseAdmins: {
        select: {
          id: true,
          username: true,
          name: true,
          image: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  courses.forEach((course) => {
    course.classes.sort((a, b) => {
      return Number(a.createdAt) - Number(b.createdAt);
    });
  });

  const publishedCourses = courses.filter((course) => course.isPublished);
  const enrolledCourses = currentUser.role === "INSTRUCTOR" ? courses : publishedCourses;

  return (
    <Leaderboard
      currentUser={currentUser}
      submissions={sortedSubmissions}
      courses={enrolledCourses}
    />
  );
} 
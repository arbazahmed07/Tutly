import { getServerSessionOrRedirect } from "@tutly/auth";
import { db } from "@tutly/db";
import Leaderboard from "./_components/leaderBoard";

export default async function TutorLeaderboardPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string; mentor?: string }>;
}) {
  const session = await getServerSessionOrRedirect();
  const currentUser = session.user;
  const { course, mentor } = await searchParams;

  const enrolledCourses = await db.enrolledUsers.findMany({
    where: {
      username: currentUser.username,
      courseId: {
        not: null,
      },
    },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          isPublished: true,
        },
      },
    },
  });

  const courses = enrolledCourses
    .map((enrolled) => enrolled.course)
    .filter((course): course is NonNullable<typeof course> => course !== null);
    

  const courseIds = courses.map((course) => course.id);

  const mentors =
    currentUser.role === "INSTRUCTOR"
      ? await db.enrolledUsers.findMany({
        where: {
          courseId:
          {in:courseIds},
          user: {
            role: "MENTOR",
            organizationId: currentUser.organizationId,
          },
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              image: true,
              mobile: true,
            },
          },
          
        },
        distinct: ["username"],
      })
      : [];

  const submissionsWhere = course
    ? {
      enrolledUser: {
        courseId: course,
        ...(currentUser.role === "MENTOR" ? { mentorUsername: currentUser.username } : {}),
      },
    }
    : {};

  const submissions = course
    ? await db.submission.findMany({
      where: submissionsWhere,
      include: {
        points: true,
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
        assignment: {
          select: {
            class: {
              select: {
                course: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    : [];

  const totalPoints = submissions.map((submission) => {
    const totalPoints = submission.points.reduce(
      (acc: number, curr: { score: number | null }) => acc + (curr.score ?? 0),
      0
    );
    return { ...submission, totalPoints };
  });

  const sortedSubmissions = totalPoints
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((submission, index) => ({
      ...submission,
      rank: index + 1,
    }));

  const publishedCourses = courses.filter((course) => course.isPublished);
  const accessibleCourses = currentUser.role === "INSTRUCTOR" ? courses : publishedCourses;

  const formattedMentors = mentors.map((mentor) => ({
    id: mentor.user.id,
    username: mentor.user.username,
    name: mentor.user.name,
    image: mentor.user.image,
    mobile: mentor.user.mobile,
    courseId:mentor.courseId
  }));
  return (
    <Leaderboard
      submissions={sortedSubmissions}
      courses={accessibleCourses}
      currentUser={currentUser}
      mentors={formattedMentors}
      selectedCourse={course}
      selectedMentor={mentor}
    />
  );
}

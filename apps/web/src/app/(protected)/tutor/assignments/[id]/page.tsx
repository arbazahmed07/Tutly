import { redirect } from "next/navigation";
import { getServerSessionOrRedirect } from "@/lib/auth/session";
import { db } from "@tutly/db";
import type { Course } from "@prisma/client";
import StudentWiseAssignments from "../_components/StudentWiseAssignments";

type SimpleCourse = {
  id: string;
  title: string;
};

type CourseWithAssignments = Course & {
  classes: {
    id: string;
    createdAt: Date;
    attachments: {
      id: string;
      title: string;
      class: {
        title: string;
      } | null;
      submissions: {
        id: string;
        points: {
          id: string;
        }[];
        enrolledUser: {
          mentorUsername: string | null;
        };
      }[];
    }[];
  }[];
};

export default async function StudentAssignmentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSessionOrRedirect();
  const currentUser = session.user;
  const { id } = await params;

  if (currentUser.role === "STUDENT") {
    return redirect("/assignments");
  }

  const courses = await db.course.findMany({
    where: {
      enrolledUsers: {
        some: {
          username: id,
        },
      },
    },
    select: {
      id: true,
      title: true,
    },
  }) as SimpleCourse[];

  const coursesWithAssignments = await db.course.findMany({
    where: {
      id: {
        in: courses.map((course) => course.id),
      },
      ...(currentUser.role === "MENTOR" && {
        classes: {
          some: {
            attachments: {
              some: {
                submissions: {
                  some: {
                    enrolledUser: {
                      mentorUsername: currentUser.username,
                    },
                  },
                },
              },
            },
          },
        },
      }),
    },
    select: {
      id: true,
      title: true,
      image: true,
      startDate: true,
      endDate: true,
      isPublished: true,
      createdAt: true,
      updatedAt: true,
      createdById: true,
      classes: {
        select: {
          id: true,
          createdAt: true,
          attachments: {
            where: {
              attachmentType: "ASSIGNMENT",
              ...(currentUser.role === "MENTOR" && {
                submissions: {
                  some: {
                    enrolledUser: {
                      mentorUsername: currentUser.username,
                    },
                  },
                },
              }),
            },
            select: {
              id: true,
              title: true,
              class: {
                select: {
                  title: true,
                },
              },
              submissions: {
                where: {
                  ...(currentUser.role === "MENTOR" && {
                    enrolledUser: {
                      mentorUsername: currentUser.username,
                    },
                  }),
                },
                select: {
                  id: true,
                  points: {
                    select: {
                      id: true,
                    },
                  },
                  enrolledUser: {
                    select: {
                      mentorUsername: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  }) as CourseWithAssignments[];

  const sortedAssignments = coursesWithAssignments.map((course) => ({
    ...course,
    classes: course.classes
      .map((cls) => ({
        ...cls,
        attachments: cls.attachments.sort((a, b) => a.title.localeCompare(b.title)),
      }))
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
  }));

  return (
    <div className="mx-2 flex flex-col gap-4 px-2 py-2 md:mx-6 md:px-8">
      <h1 className="py-2 text-center text-3xl font-semibold">ASSIGNMENTS</h1>
      {!coursesWithAssignments || coursesWithAssignments.length === 0 ? (
        <div className="text-center">No Assignments found!</div>
      ) : (
        <StudentWiseAssignments
          courses={courses}
          assignments={sortedAssignments}
          userId={id}
        />
      )}
    </div>
  );
} 
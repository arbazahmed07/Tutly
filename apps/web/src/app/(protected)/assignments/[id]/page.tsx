import { db } from "@tutly/db";
import AssignmentPage from "../_components/AssignmentPage";
import { getServerSessionOrRedirect } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function AssignmentDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSessionOrRedirect();
  const currentUser = session.user;

  const { id: assignmentId } = await params;

  const username = (await searchParams).username as string | undefined;
  const page = parseInt(((await searchParams).page as string) || "1");
  const limit = parseInt(((await searchParams).limit as string) || "10");
  const selectedMentor = (await searchParams).mentor as string | undefined;
  const searchQuery = ((await searchParams).search as string) || "";
  const skip = (page - 1) * limit;

  type EnrolledUserType = {
    username: string;
    mentorUsername: string | null;
  };

  type SubmissionWithDetails = {
    id: string;
    enrolledUser: EnrolledUserType;
    points: Array<{
      category: string;
      score: number;
    }>;
  };

  type CourseWithEnrolled = {
    id: string;
    title: string;
    createdById: string;
    enrolledUsers: EnrolledUserType[];
  };

  type AssignmentWithSubmissions = {
    id: string;
    submissions: SubmissionWithDetails[];
    course: CourseWithEnrolled | null;
    class: {
      id: string;
      course: {
        id: string;
        title: string;
        createdById: string;
      } | null;
    } | null;
    totalCount?: number;
  };

  const baseInclude = {
    class: {
      select: {
        id: true,
        course: {
          select: {
            id: true,
            title: true,
            createdById: true,
          },
        },
      },
    },
    course: {
      select: {
        id: true,
        title: true,
        createdById: true,
      },
    },
  };

  const assignment = await (async (): Promise<AssignmentWithSubmissions | null> => {
    if (currentUser.role === "INSTRUCTOR") {
      const [rawAssignmentData, totalCount] = await Promise.all([
        db.attachment.findUnique({
          where: { id: assignmentId },
          include: {
            ...baseInclude,
            submissions: {
              where: {
                AND: [
                  selectedMentor && selectedMentor !== "all"
                    ? {
                      enrolledUser: {
                        mentorUsername: selectedMentor,
                      },
                    }
                    : {},
                  searchQuery
                    ? {
                      enrolledUser: {
                        username: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                      },
                    }
                    : {},
                  username
                    ? {
                      enrolledUser: {
                        username: username,
                      },
                    }
                    : {},
                ],
              },
              take: limit,
              skip,
              orderBy: { submissionDate: "desc" },
              include: {
                enrolledUser: {
                  select: {
                    username: true,
                    mentorUsername: true,
                  },
                },
                points: {
                  select: {
                    category: true,
                    score: true,
                  },
                },
              },
            },
            course: {
              select: {
                id: true,
                title: true,
                createdById: true,
                enrolledUsers: {
                  where: {
                    user: {
                      organizationId: currentUser.organizationId,
                    },
                  },
                  select: {
                    username: true,
                    mentorUsername: true,
                  },
                },
              },
            },
          },
        }),
        db.submission.count({
          where: {
            attachmentId: assignmentId,
            AND: [
              selectedMentor && selectedMentor !== "all"
                ? {
                  enrolledUser: {
                    mentorUsername: selectedMentor,
                  },
                }
                : {},
              searchQuery
                ? {
                  enrolledUser: {
                    username: {
                      contains: searchQuery,
                      mode: "insensitive",
                    },
                  },
                }
                : {},
              username
                ? {
                  enrolledUser: {
                    username: username,
                  },
                }
                : {},
            ],
          },
        }),
      ]);

      if (!rawAssignmentData) return null;

      const assignmentData = rawAssignmentData as unknown as AssignmentWithSubmissions;
      return {
        ...assignmentData,
        totalCount,
        submissions: assignmentData.submissions || [],
        course: assignmentData.course || null,
      };
    } else if (currentUser.role === "MENTOR") {
      const [rawAssignmentData, totalCount] = await Promise.all([
        db.attachment.findUnique({
          where: { id: assignmentId },
          include: {
            ...baseInclude,
            submissions: {
              where: {
                AND: [
                  {
                    enrolledUser: {
                      mentorUsername: currentUser.username,
                    },
                  },
                  username
                    ? {
                      enrolledUser: {
                        username: username,
                      },
                    }
                    : {},
                  searchQuery
                    ? {
                      enrolledUser: {
                        username: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                      },
                    }
                    : {},
                ],
              },
              take: limit,
              skip,
              orderBy: { submissionDate: "desc" },
              include: {
                enrolledUser: {
                  select: {
                    username: true,
                    mentorUsername: true,
                  },
                },
                points: {
                  select: {
                    category: true,
                    score: true,
                  },
                },
              },
            },
            course: {
              select: {
                id: true,
                title: true,
                createdById: true,
                enrolledUsers: {
                  where: {
                    mentorUsername: currentUser.username,
                  },
                  select: {
                    username: true,
                    mentorUsername: true,
                  },
                },
              },
            },
          },
        }),
        db.submission.count({
          where: {
            attachmentId: assignmentId,
            AND: [
              {
                enrolledUser: {
                  mentorUsername: currentUser.username,
                },
              },
              username
                ? {
                  enrolledUser: {
                    username: username,
                  },
                }
                : {},
              searchQuery
                ? {
                  enrolledUser: {
                    username: {
                      contains: searchQuery,
                      mode: "insensitive",
                    },
                  },
                }
                : {},
            ],
          },
        }),
      ]);

      if (!rawAssignmentData) return null;

      const assignmentData = rawAssignmentData as unknown as AssignmentWithSubmissions;
      return {
        ...assignmentData,
        totalCount,
        submissions: assignmentData.submissions || [],
        course: assignmentData.course || null,
      };
    } else {
      const rawAssignmentData = await db.attachment.findUnique({
        where: { id: assignmentId },
        include: {
          ...baseInclude,
          submissions: {
            where: {
              enrolledUser: {
                user: {
                  id: currentUser.id,
                },
              },
            },
            include: {
              enrolledUser: {
                select: {
                  username: true,
                  mentorUsername: true,
                },
              },
              points: {
                select: {
                  category: true,
                  score: true,
                },
              },
            },
          },
        },
      });

      if (!rawAssignmentData) return null;

      const assignmentData = rawAssignmentData as unknown as AssignmentWithSubmissions;
      return {
        ...assignmentData,
        submissions: assignmentData.submissions || [],
        course: assignmentData.course || null,
      };
    }
  })();

  if (!assignment) {
    redirect("/assignments");
  }

  const notSubmittedMentees =
    assignment.course?.enrolledUsers?.filter(
      (enrolled: EnrolledUserType) =>
        !assignment.submissions?.some(
          (submission) => submission.enrolledUser.username === enrolled.username
        )
    ) ?? [];

  const sortedAssignments = [...(assignment.submissions ?? [])].sort((a, b) =>
    a.enrolledUser.username.localeCompare(b.enrolledUser.username)
  );

  const isCourseAdmin =
    currentUser.role === "INSTRUCTOR"
      ? currentUser.id === assignment.course?.createdById
      : (currentUser?.adminForCourses?.some((course) => course.id === assignment.course?.id) ?? false);

  const totalPages = Math.ceil((assignment.totalCount ?? 0) / limit);

  const mentors = assignment?.course?.enrolledUsers
    ? Array.from(
      new Set(assignment.course.enrolledUsers.map((user) => user.mentorUsername).filter(Boolean))
    )
    : [];

  return (
    <AssignmentPage
      currentUser={currentUser}
      assignment={assignment}
      assignments={sortedAssignments}
      notSubmittedMentees={notSubmittedMentees}
      isCourseAdmin={isCourseAdmin}
      username={username ?? ""}
      mentors={mentors as string[]}
      pagination={{
        currentPage: page,
        totalPages,
        pageSize: limit,
      }}
    />
  );
} 
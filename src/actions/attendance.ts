import { defineAction } from "astro:actions";
import db from "@/lib/db";
import { z } from "zod";
import { totalNumberOfClasses } from "./classes";

export const postAttendance = defineAction({
  input: z.object({
    classId: z.string(),
    data: z.array(z.object({
      username: z.string(),
      Duration: z.number()
    })),
    maxInstructionDuration: z.number()
  }),
  async handler({ classId, data, maxInstructionDuration }) {
    console.log("data", data);
    const parsedData = JSON.parse(JSON.stringify(data));
    console.log("parsedData", parsedData);

    const postAttendance = await db.attendance.createMany({
      data: [
        ...parsedData.map((student: any) => {
          if (student.Duration >= (60 * maxInstructionDuration) / 100) {
            return {
              classId,
              username: student.username,
              attendedDuration: student.Duration,
              data: student?.Joins,
              attended: true,
            };
          }
          return {
            classId,
            username: student.username,
            attendedDuration: student.Duration,
            data: student?.Joins,
          };
        }),
      ],
    });

    return { success: true, data: postAttendance };
  }
});

export const getAttendanceForMentorByIdBarChart = defineAction({
  input: z.object({
    id: z.string(),
    courseId: z.string()
  }),
  async handler({ id, courseId }) {
    const attendance = await db.attendance.findMany({
      where: {
        user: {
          enrolledUsers: {
            some: {
              mentorUsername: id,
            },
          },
        },
        attended: true,
      },
    });

    const getAllClasses = await db.class.findMany({
      where: {
        courseId,
      },
      select: {
        id: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const classes = [] as any;
    const attendanceInEachClass = [] as any;
    getAllClasses.forEach((classData) => {
      classes.push(classData.createdAt.toISOString().split("T")[0]);
      const tem = attendance.filter(
        (attendanceData) => attendanceData.classId === classData.id,
      );
      attendanceInEachClass.push(tem.length);
    });

    return { success: true, data: { classes, attendanceInEachClass } };
  }
});

export const getAttendanceForMentorBarChart = defineAction({
  input: z.object({
    courseId: z.string()
  }),
  async handler({ courseId }, { locals }) {
    const currentUser = locals.user!

    let attendance;
    if (currentUser.role === "MENTOR") {
      attendance = await db.attendance.findMany({
        where: {
          user: {
            enrolledUsers: {
              some: {
                mentorUsername: currentUser.username,
              },
            },
          },
          attended: true,
          class: {
            course: {
              id: courseId,
            },
          },
        },
      });
    } else {
      attendance = await db.attendance.findMany({
        where: {
          attended: true,
          class: {
            courseId,
          },
        },
      });
    }

    const getAllClasses = await db.class.findMany({
      where: {
        courseId,
      },
      select: {
        id: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const classes = [] as any;
    const attendanceInEachClass = [] as any;
    getAllClasses.forEach((classData) => {
      classes.push(classData.createdAt.toISOString().split("T")[0]);
      const tem = attendance.filter(
        (attendanceData) => attendanceData.classId === classData.id,
      );
      attendanceInEachClass.push(tem.length);
    });

    return { success: true, data: { classes, attendanceInEachClass } };
  }
});

export const getAttedanceByClassId = defineAction({
  input: z.object({
    id: z.string()
  }),
  async handler({ id }, { locals }) {
    const currentUser = locals.user!

    const attendance = await db.attendance.findMany({
      where: {
        classId: id,
      },
    });

    return { success: true, data: attendance };
  }
});

export const getAttendanceOfStudent = defineAction({
  input: z.object({
    id: z.string(),
    courseId: z.string()
  }),
  async handler({ id, courseId }) {
    const attendance = await db.attendance.findMany({
      where: {
        username: id,
        AND: {
          class: {
            course: {
              id: courseId,
            },
          },
        },
      },
      select: {
        class: {
          select: {
            createdAt: true,
          },
        },
      },
    });

    const attendanceDates = [] as any;
    attendance.forEach((attendanceData) => {
      attendanceDates.push(
        attendanceData.class.createdAt.toISOString().split("T")[0],
      );
    });

    const getAllClasses = await db.class.findMany({
      where: {
        courseId,
      },
      select: {
        id: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const classes = [] as any;
    getAllClasses.forEach((classData) => {
      if (
        !attendanceDates.includes(classData.createdAt.toISOString().split("T")[0])
      ) {
        classes.push(classData.createdAt.toISOString().split("T")[0]);
      }
    });

    return { success: true, data: { classes, attendanceDates } };
  }
});

export const deleteClassAttendance = defineAction({
  input: z.object({
    classId: z.string()
  }),
  async handler({ classId }, { locals }) {
    const currentUser = locals.user!

    if (!currentUser) {
      return { error: "You must be logged in to attend a class" };
    }
    if (currentUser.role !== "INSTRUCTOR") {
      return { error: "You must be an instructor to delete an attendance" };
    }

    const attendance = await db.attendance.deleteMany({
      where: {
        classId,
      },
    });

    return { success: true, data: attendance };
  }
});

export const getTotalNumberOfClassesAttended = defineAction({
  async handler(_, { locals }) {
    const currentUser = locals.user!

    if (!currentUser || currentUser.role === "STUDENT") {
      return { error: "You must be logged in as an instructor or mentor to view attendance" };
    }

    let attendance;
    if (currentUser.role === "MENTOR") {
      attendance = await db.attendance.findMany({
        where: {
          user: {
            enrolledUsers: {
              some: {
                mentorUsername: currentUser.username,
              },
            },
          },
        },
        select: {
          username: true,
          user: true,
          attended: true,
        },
      });
    } else {
      attendance = await db.attendance.findMany({
        where: {
          user: {
            role: "STUDENT",
          },
        },
        select: {
          username: true,
          user: true,
          attended: true,
        },
      });
    }

    const groupByTotalAttendance = [] as any;

    attendance.forEach((attendanceData) => {
      if (attendanceData.attended) {
        if (groupByTotalAttendance[attendanceData.username]) {
          groupByTotalAttendance[attendanceData.username] = {
            ...groupByTotalAttendance[attendanceData.username],
            count: groupByTotalAttendance[attendanceData.username].count + 1,
          };
        } else {
          groupByTotalAttendance[attendanceData.username] = {
            username: attendanceData.username,
            name: attendanceData.user.name,
            mail: attendanceData.user.email,
            image: attendanceData.user.image,
            role: attendanceData.user.role,
            count: 1,
          };
        }
      }
    });

    return { success: true, data: groupByTotalAttendance };
  }
});

export const getAttendanceForLeaderbaord = defineAction({
  async handler(_, { locals }) {
    const currentUser = locals.user!

    if (!currentUser) {
      return { error: "You must be logged in to attend a class" };
    }

    const attendance = await db.attendance.findMany({
      where: {
        attended: true,
      },
      select: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    const groupedAttendance = attendance.reduce((acc: any, curr: any) => {
      const username = curr.user.username;
      acc[username] = (acc[username] || 0) + 1;
      return acc;
    }, {});

    return { success: true, data: groupedAttendance };
  }
});

export const getAttendanceOfAllStudents = defineAction({
  async handler(_, { locals }) {
    const currentUser = locals.user!

    if (!currentUser) {
      return { error: "You must be logged in to attend a class" };
    }

    const totalAttendance = await getTotalNumberOfClassesAttended();
    const totalCount = await totalNumberOfClasses();
    const jsonData = totalAttendance.data ? Object.entries(totalAttendance.data).map(
      ([_, value]: [string, any]) => ({
        username: value.username,
        name: value.name,
        mail: value.mail,
        image: value.image,
        role: value.role,
        percentage: (Number(value.count) * 100) / Number(totalCount),
      }),
    ) : [];

    return { success: true, data: jsonData };
  }
});

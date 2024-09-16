import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import { totalNumberOfClasses } from "./classes";
import day from "@/lib/dayjs";
import { type InputJsonValue } from "@prisma/client/runtime/library";

interface AttendanceData {
  Joins: InputJsonValue[];
  username: string;
  Duration: number;
}

export const postAttendance = async ({
  classId,
  data,
  maxInstructionDuration,
}: {
  classId: string;
  data: AttendanceData[];
  maxInstructionDuration: number;
}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("You must be logged in to attend a class");
  }
  const parsedData = data;
  const postAttendance = await db.attendance.createMany({
    data: parsedData.map((student) => ({
      classId,
      username: student.username,
      attendedDuration: student.Duration,
      data: student.Joins,
      attended: student.Duration >= (60 * maxInstructionDuration) / 100,
    })),
  });

  return postAttendance;
};

export const getAttendanceForMentorByIdBarChart = async (
  id: string,
  courseId: string,
) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("You must be logged in to attend a class");
  }
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
  const classes: (string | undefined)[] = [];
  const attendanceInEachClass: number[] = [];
  getAllClasses.forEach((classData) => {
    classes.push(classData.createdAt.toISOString().split("T")[0]);
    const tem = attendance.filter(
      (attendanceData) => attendanceData.classId === classData.id,
    );
    attendanceInEachClass.push(tem.length);
  });
  return { classes, attendanceInEachClass };
};

export const getAttendanceForMentorBarChart = async (courseId: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("You must be logged in to attend a class");
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
  const classes: string[] = [];
  const attendanceInEachClass: number[] = [];
  getAllClasses.forEach((classData) => {
    const date = day(classData.createdAt).format("DD-MM-YYYY");
    classes.push(date);
    const tem = attendance.filter(
      (attendanceData) => attendanceData.classId === classData.id,
    );
    attendanceInEachClass.push(tem.length);
  });
  return { classes, attendanceInEachClass };
};

export const getAttedanceByClassId = async (id: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("You must be logged in to attend a class");
  }
  const attendance = await db.attendance.findMany({
    where: {
      classId: id,
    },
  });
  return attendance;
};

export const getAttendanceOfStudent = async (id: string, courseId: string) => {
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
  const attendanceDates: string[] = [];
  attendance.forEach((attendanceData) => {
    const date = day(attendanceData.class.createdAt).format("DD-MM-YYYY");
    if (attendanceData.class.createdAt) {
      attendanceDates.push(date);
    }
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
  const classes: string[] = [];
  getAllClasses.forEach((classData) => {
    const date = day(classData.createdAt).format("DD-MM-YYYY");
    if (!attendanceDates.includes(date)) {
      classes.push(date);
    }
  });
  return { classes, attendanceDates };
};

export const deleteClassAttendance = async (classId: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("You must be logged in to attend a class");
  }
  if (currentUser.role !== "INSTRUCTOR") {
    throw new Error("You must be an instructor to delete an attendance");
  }
  const attendance = await db.attendance.deleteMany({
    where: {
      classId,
    },
  });
  return attendance;
};

interface AttendanceCount {
  username: string;
  name: string;
  mail: string;
  image: string | null;
  role: string;
  count: number;
}

export const getTotalNumberOfClassesAttended = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role === "STUDENT") {
    throw new Error(
      "You must be logged in as an instructor or mentor to view attendance",
    );
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

  const groupByTotalAttendance: Record<string, AttendanceCount> = {};

  attendance.forEach((attendanceData) => {
    if (attendanceData.attended) {
      if (attendanceData.username in groupByTotalAttendance) {
        const userAttendance = groupByTotalAttendance[attendanceData.username];
        if (userAttendance) {
          userAttendance.count += 1;
        }
      } else {
        groupByTotalAttendance[attendanceData.username] = {
          username: attendanceData.username,
          name: attendanceData.user.name ?? "",
          mail: attendanceData.user.email ?? "",
          image: attendanceData.user.image,
          role: attendanceData.user.role,
          count: 1,
        };
      }
    }
  });

  return groupByTotalAttendance;
};

export const getAttendanceForLeaderbaord = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("You must be logged in to attend a class");
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

  const groupedAttendance = attendance.reduce(
    (acc: Record<string, number>, curr) => {
      const username = curr.user.username;
      acc[username] = (acc[username] ?? 0) + 1;
      return acc;
    },
    {},
  );
  return groupedAttendance;
};

export const getAttendanceOfAllStudents = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("You must be logged in to attend a class");
  }
  const totalAttendance = await getTotalNumberOfClassesAttended();
  const totalCount = await totalNumberOfClasses();

  const jsonData = Object.entries(totalAttendance).map(
    ([, value]: [string, AttendanceCount]) => ({
      username: value.username,
      name: value.name,
      mail: value.mail,
      image: value.image,
      role: value.role,
      percentage: (Number(value.count) * 100) / totalCount,
    }),
  );
  return jsonData;
};

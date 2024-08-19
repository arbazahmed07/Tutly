import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import { totalNumberOfClasses } from "./classes";
import { forEach } from "lodash";

export const postAttendance = async ({
  classId,
  data,
}: {
  classId: string;
  data: { username: string; Duration: number }[];
}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("You must be logged in to attend a class");
  }
  const parsedData = JSON.parse(JSON.stringify(data));
  // find the maximum duration among all the INSTRUCTION role students
  let maxInstructionDuration = 0;
  data.forEach(element => {
    if (element.Duration > maxInstructionDuration) {
      maxInstructionDuration = element.Duration;
    }
  });
  const postAttendance = await db.attendance.createMany({
    data: [
      ...parsedData.map((student: any) => {
        if (student.Duration >= ((60*maxInstructionDuration)/100)) {
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
  return postAttendance;
};
export const getAttendanceForMentorByIdBarChart = async (id: string) => {
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
    select: {
      id: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  const classes = <any>[];
  const attendanceInEachClass = <any>[];
  getAllClasses.forEach((classData) => {
    classes.push(classData.createdAt.toISOString().split("T")[0]);
    const tem = attendance.filter(
      (attendanceData) => attendanceData.classId === classData.id
    );
    attendanceInEachClass.push(tem.length);
  });
  return { classes, attendanceInEachClass };
};
export const getAttendanceForMentorBarChart = async () => {
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
      },
    });
  } else {
    attendance = await db.attendance.findMany({
      where: {
        attended: true,
      },
    });
  }
  const getAllClasses = await db.class.findMany({
    select: {
      id: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  const classes = <any>[];
  const attendanceInEachClass = <any>[];
  getAllClasses.forEach((classData) => {
    classes.push(classData.createdAt.toISOString().split("T")[0]);
    const tem = attendance.filter(
      (attendanceData) => attendanceData.classId === classData.id
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

export const getAttendanceOfStudent = async (id: string) => {
  const attendance = await db.attendance.findMany({
    where: {
      username: id,
    },
    select: {
      class: {
        select: {
          createdAt: true,
        },
      },
    },
  });
  let attendanceDates = <any>[];
  attendance.forEach((attendanceData) => {
    attendanceDates.push(
      attendanceData.class.createdAt.toISOString().split("T")[0]
    );
  });

  const getAllClasses = await db.class.findMany({
    select: {
      id: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  const classes = <any>[];
  getAllClasses.forEach((classData) => {
    if (
      !attendanceDates.includes(classData.createdAt.toISOString().split("T")[0])
    ) {
      classes.push(classData.createdAt.toISOString().split("T")[0]);
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

export const getTotalNumberOfClassesAttended = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role === "STUDENT") {
    throw new Error("You must be logged in as an instructor or mentor to view attendance");
  }
  let attendance;
  if(currentUser.role==="MENTOR") {
    attendance = await db.attendance.findMany({
      where: {
        user:{
          enrolledUsers:{
            some:{
              mentorUsername: currentUser.username
            }
          }
        }
      },
      select: {
        username: true,
        user: true,
        attended: true,
      }
    });
  } else {
    attendance = await db.attendance.findMany({
      where:{
        user:{
          role: "STUDENT"
        }
      },
      select: {
        username: true,
        user: true,
        attended: true,
      }
    });
  }

  let groupByTotalAttendance = <any>[];

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
  const groupedAttendance = attendance.reduce((acc: any, curr: any) => {
    const username = curr.user.username;
    acc[username] = (acc[username] || 0) + 1;
    return acc;
  }, {});
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
    ([username, value]: [string, any]) => ({
      username: value.username,
      name: value.name,
      mail: value.mail,
      image: value.image,
      role: value.role,
      percentage: (Number(value.count) * 100) / totalCount,
    })
  );
  return jsonData;
};

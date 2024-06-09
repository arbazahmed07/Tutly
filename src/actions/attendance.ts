import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

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
  const postAttendance = await db.attendance.createMany({
    data: [
      ...parsedData.map((student: any) => {
        if (student.Duration > 60) {
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

export const getAttendanceOfStudent = async(id:string)=>{
  const attendance = await db.attendance.findMany({
    where:{
      username:id
    },
    select:{
      class:{
        select:{
          createdAt:true
        }
      }
    }
  })
  let attendanceDates = <any>[];
  attendance.forEach((attendanceData)=>{
    attendanceDates.push(attendanceData.class.createdAt.toISOString().split("T")[0])
  })

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
    if(!attendanceDates.includes(classData.createdAt.toISOString().split("T")[0])){
      classes.push(classData.createdAt.toISOString().split("T")[0]);
    }
  });
  return {classes,attendanceDates};
}

export const deleteClassAttendance = async (classId: string) => {

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("You must be logged in to attend a class");
  }
  if(currentUser.role!=="INSTRUCTOR"){
    throw new Error("You must be an instructor to delete an attendance");
  }
  const attendance = await db.attendance.deleteMany({
    where:{
      classId,
    }
  })
  return attendance;
};
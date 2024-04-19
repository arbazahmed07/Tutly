import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

export const getAllCourses = async () => {
    try {
        const courses = await db.course.findMany({
            where: {},
            include: {
                _count: {
                    select: {
                        Classes: true
                    }
                }
            }
        });
        return courses;
    } catch (e) {
        console.log("error while fetching courses :", e);
    }
}

export const getCourseClasses = async (id: string) => {
    const classes = await db.class.findMany({
        where: {
            courseId: id
        },
        include: {
            Course: true,
            video: true,
            attachments: true,            
        }
    })
    return classes;
}

export const getEnrolledCourses = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) return null;
    const courses = await db.course.findMany({
        where: {
            enrolledUsers: {
                some: {
                    userId: currentUser.id
                }
            }
        },
        include: {
            Classes: true,
            createdBy: true,
            _count: {
                select: {
                    Classes: true
                }
            }
        }
    })
    return courses;
}

export const getClassDetails = async (id: string) => {
    const classDetails = await db.class.findUnique({
        where: {
            id: id
        },
        include: {
            video: true,
            attachments: true
        }
    });
    return classDetails;
}
import { db } from "@/lib/db";
import * as z from "zod";

const classSchema = z.object({
    classTitle: z.string().trim().min(1, {
        message: "Title is required",
    }),
    videoLink: z.string().trim().min(1,),
    VideoType: z.enum(["DRIVE", "YOUTUBE", "ZOOM"]),
    courseId : z.string().trim().min(1,),
});

console.log("Creating class");


export const createClass = async (data : z.infer<typeof classSchema>) => {

    const myclass = await db.class.create({
        data: {
            title: data.classTitle,
            video: {
                create: {
                    videoLink: data.videoLink,
                    videoType: data.VideoType,
                },
            },
            course: {
                connect: {
                    id: data.courseId,
                },
            },
        },
    });

    return myclass;
};

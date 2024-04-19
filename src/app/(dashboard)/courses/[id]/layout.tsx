import { getCourseClasses } from "@/actions/getAllCourses";
import Link from "next/link";

export default async function CourseLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: { id: string }
}>) {
    const classes = await getCourseClasses(params.id)
    return (
        <div className="flex">
            <div className="flex-col px-4 py-3 gap-4 shadow-xl min-h-[90vh]">
                <h1 className="px-2">HTML</h1>
                <div>
                    {
                        classes.map((x) => {
                            return (
                                <Link className="px-2" href={`/`}>{x.title}</Link>
                            )
                        })
                    }
                </div>
            </div>
            <div>{children}</div>
        </div>
    )
}
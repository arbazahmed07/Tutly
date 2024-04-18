"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({links,menu}:any) {
    const pathname = usePathname();
    return (
        <div className={`min-h-dvh shadow-xl px-2 pt-3`}>
            <Link href='/'>
                <div className={`text-2xl font-bold mb-6`}>
                    LMS
                </div>
            </Link>
            {
                links.map((link:any)=>{
                    return (
                        <Link href={link.path} className={`${pathname===link.path?"bg-primary-700":"hover:bg-primary-900"} m-auto rounded py-2 px-4 my-2 flex items-center gap-4`}>
                            <div className={`text-2xl`}>{link.icon}</div>
                            <h1 className={`${!menu&&"hidden"}`}>{link.name}</h1>
                        </Link>
                    )
                })
            }
        </div>
    )
}
"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    items :{
        name:string,
        icon:any,
        path:string
    }[],
    menu: boolean
}

export default function Sidebar({items,menu}:Props) {
    const pathname = usePathname();
    return (
        <div className={`min-h-dvh shadow-xl px-2 pt-3`}>
            <Link href='/'>
                <div className={`text-2xl font-bold mb-6`}>
                    LMS
                </div>
            </Link>
            {
                items.map((link:any)=>{
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
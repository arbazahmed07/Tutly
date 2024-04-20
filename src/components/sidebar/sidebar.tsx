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
        <div className={`${!menu&&"max-sm:hidden"} max-sm:absolute z-40  max-sm:pt-12 bg-background min-h-dvh shadow-xl px-3 pt-3 sticky top-0`}>
            <Link href='/'>
                <div className={`max-sm:hidden text-2xl font-bold mt-2`}>
                    LMS
                </div>
            </Link>
            {
                items.map((item)=>{
                    return (
                        <Link href={item.path} key={item.path} className={`${pathname===item.path?"bg-primary-700":"hover:bg-primary-900"} m-auto rounded p-2 my-2 flex items-center gap-4`}>
                            <div className={`text-2xl px-2`}>{item.icon}</div>
                            <h1 className={`${!menu&&"hidden"}`}>{item.name}</h1>
                        </Link>
                    )
                })
            }
        </div>
    )
}
"use client"
import { usePathname,useRouter } from "next/navigation";

interface Props {
    items :{
        name:string,
        icon:any,
        path:string
    }[],
    menu: boolean,
    setMenu: (menu: boolean) => void
}

export default function Sidebar({items,menu,setMenu}:Props) {
    const pathname = usePathname();
    const router=useRouter()
    const Mobile=(link:any)=>{
        router.push(link);
        setMenu(false)
    }
    const Desktop=(link:any)=>{
        router.push(link);
    }
    return (
        <div className={`${!menu&&"max-sm:hidden max-sm:pt-12"} p-3 -mt-3 bg-background absolute sm:fixed left-0 sm:top-14 z-40  min-h-dvh px-2 shadow-sm shadow-blue-800/40`}>
            {
                items.map((item)=>{
                    return (
                      <div key={item.path}>
                            <div onClick={()=>Mobile(item.path)} key={item.path} className={`${pathname!=='/' ? pathname.startsWith(item.path):pathname===item.path||(pathname.includes("/assignments")&&item.name=="Assignments") ?"bg-blue-600 text-white":"hover:bg-blue-500 hover:text-white"} m-auto rounded md:hidden px-4 py-3 my-2 flex items-center gap-4 cursor-pointer`}>
                                <div className={`text-2xl px-2`}>{item.icon}</div>
                                <h1 className={`${!menu&&"hidden"}`}>{item.name}</h1>
                            </div>
                            <div onClick={()=>Desktop(item.path)} key={item.path} className={`${pathname===item.path||(pathname.includes("/assignments")&&item.name=="Assignments")?"bg-blue-600 text-white":"hover:bg-blue-500 hover:text-white"} m-auto rounded hidden md:flex px-3 py-3 my-2 items-center gap-4 cursor-pointer`}>
                                <div className={`text-2xl px-2`}>{item.icon}</div>
                                <h1 className={`${!menu&&"hidden"}`}>{item.name}</h1>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
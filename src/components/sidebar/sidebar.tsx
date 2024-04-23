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
        <div className={`${!menu&&"max-sm:hidden"} p-3 -mt-3 max-sm:absolute z-40 max-sm:pt-12 min-h-dvh px-2 sticky top-0`} style={{boxShadow:"rgba(0, 0, 0, 0.25) 0px 4px 8px -2px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(255, 255, 255, 0.5) 2px 0px 6px -2px"}}>
            {
                items.map((item)=>{
                    return (
                      <div>
                            <div onClick={()=>Mobile(item.path)} key={item.path} className={`${pathname===item.path?"bg-blue-600":"hover:bg-blue-500"} m-auto rounded md:hidden px-4 py-3 my-2 flex items-center gap-4 cursor-pointer`}>
                                <div className={`text-2xl px-2`}>{item.icon}</div>
                                <h1 className={`${!menu&&"hidden"}`}>{item.name}</h1>
                            </div>
                            <div onClick={()=>Desktop(item.path)} key={item.path} className={`${pathname===item.path?"bg-blue-600":"hover:bg-blue-500"} m-auto rounded hidden md:flex px-3 py-3 my-2 items-center gap-4 cursor-pointer`}>
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
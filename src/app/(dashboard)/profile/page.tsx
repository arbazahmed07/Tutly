
import getCurrentUser from "@/actions/getCurrentUser";
import Image from "next/image";
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";



const formatDate = (e:string) => {
    const date = new Date(e);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12; 

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;

    return `${formattedDate} ${formattedTime}`;
}

const Page=async()=>{
    
  const currentUser = await getCurrentUser();
    return (
        <div className="p-5">
            <pre>
                {/* {JSON.stringify(currentUser,null,2)} */}
            </pre>
            {
                currentUser && 
                (
                    <div className="flex gap-4">
                    <div>
                    <Image
                    src={currentUser?.image || '/images/default.png'}
                    width={120}
                    height={120}
                    className="rounded"
                    alt="profile"
                    />
                    </div>
                    <div className="flex flex-col justify-between">
                    <h1><span className="font-semibold">Name :</span> <span className="text-gray-500 ml-2">{currentUser?.name}</span></h1>
                    <h1><span className="font-semibold">Email :</span> <span className="text-gray-500 ml-2">{currentUser?.email}</span></h1>
                    <h1><span className="font-semibold">Roll Number :</span> <span className="text-gray-500 ml-2">{currentUser?.username}</span></h1>
                    {
                        currentUser?.role === 'INSTRUCTOR' ? (
                            <h1 className="flex"><span className="font-semibold">Role :</span> <span className="text-gray-500 ml-2 flex items-center justify-start">{currentUser?.role} &nbsp; <FaChalkboardTeacher className="w-5 h-5 " /></span></h1>
                        )
                        :
                        (
                            <h1 className="flex">
                                    <span className="font-semibold">Role :</span> 
                                    <span className="text-gray-500 ml-2 flex items-center justify-start">{currentUser?.role}&nbsp;<PiStudentFill className=" w-5 h-5" /></span>
                            </h1>
                        )
                    }
                    <h1><span className="font-semibold">CreatedAt :</span> <span className="text-gray-500 ml-2">{formatDate(currentUser?.createdAt?.toString())}</span></h1>
                </div>
            </div>
            )}
        </div>
    )
}

export default Page;
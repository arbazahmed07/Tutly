'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formatDate = (e: string) => {
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

const UserProfile = ({ currentUser }: { currentUser: any }) => {
    const router = useRouter();
    const [formData, setFormData] = useState(currentUser);


    return (
        <div className="flex flex-col items-center m-5 md:m-10 font-semibold dark:text-white">
            <Image src={formData?.image || '/images/placeholder.jpg'} alt="User Image" width={120} height={120} className="rounded-full bg-slate-300 mb-5" />
            <form   className="flex flex-col md:flex-row justify-center md:gap-10 dark:text-white">
                <div className="w-[100%] md:w-[40%] mt-2 dark:text-white">
                    <label className="text-sm  dark:text-secondary-50">Username:</label>
                    <input
                        type="text"
                        name="username"
                        disabled
                        value={formData?.username || ''}
                        className="w-full px-4 py-2 mb-2 text-sm rounded border border-blue-200 focus:outline-none focus:border-blue-500"
                    />
                    <label className="block mb-1 text-sm">
                        Email:
                        <input
                            type="email"
                            name="email"
                            disabled
                            value={formData?.email || ''}
                            className="w-full px-4 py-2 mb-2 text-sm rounded border border-blue-200 focus:outline-none focus:border-blue-500"
                        />
                    </label>
                </div>
                <div className="w-[100%] md:mt-3 md:w-[40%] dark:text-white">
                    <label className="block mb-1 text-sm">
                        Name:
                        <input
                            type="text"
                            name="name"
                            disabled
                            value={formData?.name || 'null'}
                            className="w-full px-4 py-2 rounded border mb-2 border-blue-200 focus:outline-none focus:border-blue-500"
                        />
                    </label>
                    <label className="block mb-2 text-sm dark:text-white">
                        Role:
                        <input
                            type="text"
                            name="role"
                            disabled
                            value={formData?.role || 'STUDENT'}
                            className="w-full px-4 py-2  rounded border border-blue-200 focus:outline-none focus:border-blue-500"
                        />
                    </label>
                </div>
            </form>

            <div className="mt-5 flex flex-row-reverse justify-end  items-center  cursor-pointer bg-primary-500 hover:bg-primary-600 px-3 py-2 rounded-lg" >
                <button  onClick={() => router.push('/profile/manage-password')} className="text-white " >
                    Manage Password
                </button>
            </div>
        </div>
    );
}

export default UserProfile;

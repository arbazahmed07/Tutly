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
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState(currentUser);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(JSON.stringify(formData, null, 2));
        // You can add logic here to send the updated data to the server
        setEditMode(false);
    };

    return (
        <div className="flex flex-col items-center m-10 font-semibold">
            <Image src={formData?.image || '/images/placeholder.jpg'} alt="User Image" width={120} height={120} className="rounded-full bg-slate-300" />
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center md:gap-10">
                <div className="w-[100%] md:w-[40%] mt-2 text-gray-600">
                    <label className="text-sm text-gray-600">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData?.username || ''}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="w-full px-4 py-2 mb-2 text-sm rounded border border-blue-200 focus:outline-none focus:border-blue-500"
                    />
                    <label className="text-sm text-gray-600  ">Created At:</label>
                    <input
                        type="text"
                        value={formatDate(formData?.createdAt.toISOString() || '') || 'null'}
                        disabled
                        className="w-full px-4 py-2 text-sm mb-2 rounded  border border-blue-200 focus:outline-none  "
                    />
                    <label className="text-sm text-gray-600 ">Updated At:</label>
                    <input
                        type="text"
                        value={formatDate(formData?.updatedAt.toISOString() || '') || 'null'}
                        disabled
                        className="w-full px-4 py-2 text-sm mb-2 rounded  border border-blue-200 focus:outline-none "
                    />
                </div>
                <div className="w-[100%] md:w-[40%] text-gray-600">
                    <label className="block mb-1 text-sm">
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData?.name || 'null'}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            className="w-full px-4 py-2 rounded border mb-2 border-blue-200 focus:outline-none focus:border-blue-500"
                        />
                    </label>
                    <label className="block mb-1 text-sm">
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData?.email || ''}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            className="w-full px-4 py-2 mb-2 text-sm rounded border border-blue-200 focus:outline-none focus:border-blue-500"
                        />
                    </label>
                    <label className="block mb-2 text-sm">
                        Role:
                        <input
                            type="text"
                            name="role"
                            value={formData?.role || ''}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            className="w-full px-4 py-2  rounded border border-blue-200 focus:outline-none focus:border-blue-500"
                        />
                    </label>
                </div>
            </form>
        </div>
    );
}

export default UserProfile;

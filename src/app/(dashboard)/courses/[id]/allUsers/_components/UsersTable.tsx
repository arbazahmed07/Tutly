'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheck, FaUserPlus } from 'react-icons/fa';


const UserTable = ({ users, params }: { users: Array<any>, params: any }) => {

const [loading, setLoading] = useState(false);
const router = useRouter()

    
const handleEnroll =  async (username: string) => {
    toast.loading('Enrolling user...');
    try{
        setLoading(true);
        const res = await axios.post('/api/course/enrollUser', {
            courseId: params.id,
            username
        });
        console.log(res.data);
        toast.dismiss();
        toast.success('User enrolled successfully');
        setLoading(false);
        router.refresh ()
    }catch(err :any){
        setLoading(false);
        toast.dismiss();
        toast.error(err.response.data.error);
    }
}

return (
<table className="border border-collapse border-gray-300 mb-10">
    <thead>
    <tr>
        <th className="border border-gray-300 px-4 py-2">S.No</th>
        <th className="border border-gray-300 px-4 py-2">Username</th>
        <th className="border border-gray-300 px-4 py-2">Name</th>
        <th className="border border-gray-300 px-4 py-2">Email</th>
        <th className="border border-gray-300 px-4 py-2">Courses</th>
        <th className="border border-gray-300 px-4 py-2">Action</th>
    </tr>
    </thead>
    <tbody>
    {users.map((user, index) => (
        <tr key={user.id} className={`${user.enrolledUsers.length === 0 && 'bg-red-500'}`}>
            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
            <td className="py-2 px-4 border border-gray-300">
                <div className="flex items-center space-x-2">
                {user.image ? (
                    <img
                    src={user.image}
                    alt="user"
                    className="w-8 h-8 rounded-full"
                    />
                )
                : (
                    <img src={'/images/placeholder.jpg'} className="w-8 h-8 rounded-full" alt="no image dummy" />
                )}
                <span>{user.username}</span>
                </div>
            </td>
            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
            <td className="border border-gray-300 px-4 py-2">
                {
                    user.enrolledUsers.length === 0 ? 'No courses' :
                    user.enrolledUsers.map(({ course }: { course: any }, index: number) => (
                        course.id === params.id &&
                        <span key={course.id}>{index > 0 ? ', ' : ''}{course.title}</span>
                ))}
            </td>
            <td className="border border-gray-300 px-4 py-2">
                {
                    user.enrolledUsers.find (({ course }: { course: any }) => course.id === params.id) === undefined 
                    ?
                    <button disabled={loading} onClick={()=>handleEnroll(user.username)} 
                    className="px-3 py-1.5 flex items-center justify-center bg-red-800 text-white rounded-full hover:bg-red-700 focus:outline-none focus:bg-red-800">
                        Enroll &nbsp; <FaUserPlus  className=' w-5 h-5' />
                    </button>
                :
                    <div className="px-3 py-1.5 flex items-center justify-center bg-emerald-800 text-white rounded-full hover:bg-emerald-700   focus:outline-none focus:bg-red-800">
                        Enrolled &nbsp; <FaCheck />
                    </div>
                }
            </td>
        </tr>
    ))}
    </tbody>
</table>
);
};

export default UserTable;

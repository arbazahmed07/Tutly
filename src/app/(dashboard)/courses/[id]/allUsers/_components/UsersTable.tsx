'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheck, FaUserPlus } from 'react-icons/fa';
import { RiGlobalLine } from "react-icons/ri";
import { TbUserOff } from "react-icons/tb";
import { TbUserSearch } from "react-icons/tb";
import { PiEmptyLight } from "react-icons/pi";


const UserTable = ({ users, params }: { users: Array<any>, params: any }) => {

const [loading, setLoading] = useState(false);
const router = useRouter()
const [showAllUsers, setShowAllUsers] = useState(true);
const [searchBar,  setSearchBar] = useState('');

const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchBar.trim().toLowerCase())
);

const displayedUsers = showAllUsers ? filteredUsers : filteredUsers.filter(user => user.enrolledUsers.length === 0);

    
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
<div className="mb-10">
    <div className="flex items-center justify-between space-x-4 mb-4">
    <div className=' flex items-center justify-center relative '>
        <input
        type="text"
        placeholder="Search by username..."
        value={searchBar}
        onChange={(e) =>  setSearchBar(e.target.value)}
        className="  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <TbUserSearch className=' w-5 h-5 absolute top-2 right-2 ' />
    </div>
    
        <div className=' flex items-center justify-center'>
            <label className="cursor-pointer flex items-center justify-center mr-3">
                <input
                type="radio"
                name="userFilter"
                checked={showAllUsers}
                onChange={() => setShowAllUsers(true)}
                className="mr-2 "
                />
                All  { } <RiGlobalLine className='w-5 h-5' />
            </label>
            <label className="cursor-pointer flex items-center justify-center ">
                <input
                type="radio"
                name="userFilter"
                checked={!showAllUsers}
                onChange={() => setShowAllUsers(false)}
                className="mr-2"
                />
                Users Not Enrolled { }  <TbUserOff className='w-5 h-5' />
            </label>
        </div>
    </div>


    <table className="border border-collapse border-gray-300">
    <thead>
        <tr className=' bg-sky-800'>
            <th className="border border-gray-300 px-4 py-2">S.No</th>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Course</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
        </tr>
    </thead>
    <tbody>
        {
            displayedUsers.length === 0 && (
                <tr className='  '>
                    <td colSpan={6} className="text-center text-xl py-4  ">
                        <div className=' flex items-center justify-center px-16 '>
                            No users found <PiEmptyLight className='w-8 h-8' /> 
                        </div>
                    </td>
                </tr>
            )
        }
        {displayedUsers.map((user, index) => (
        <tr key={user.id} className={`${user.enrolledUsers.length === 0 ? 'bg-red-500 hover:bg-red-600 ' : 'hover:bg-slate-600'} `}>
            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
            <td className="py-2 px-4 border border-gray-300">
            <div className="flex items-center space-x-2">
                {user.image ? (
                <img
                    src={user.image}
                    alt="user"
                    className="w-8 h-8 rounded-full"
                />
                ) : (
                <img src={'/images/placeholder.jpg'} className="w-8 h-8 rounded-full" alt="no image dummy" />
                )}
                <span>{user.username}</span>
            </div>
            </td>
            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
            <td className="border border-gray-300 px-4 py-2">
            {user.enrolledUsers.find( ({course}:{ course:any }) => course.id===params.id ) === undefined  ? 'Not Enrolled ' :
                user.enrolledUsers.map(({ course }: { course: any }, index: number) => (
                    course.id === params.id &&
                    <span key={course.id}>{index > 0 ? ', ' : ''}{course.title}</span>
                ))}
            </td>
            <td className="border border-gray-300 px-4 py-2">
            {user.enrolledUsers.find(({course}: { course:any }) => course.id === params.id) === undefined ?
                <button disabled={loading} onClick={() => handleEnroll(user.username)}
                className="px-3 py-1.5 flex items-center justify-center bg-red-800 text-white rounded-full hover:bg-red-900 select-none focus:outline-none focus:bg-red-800">
                Enroll &nbsp; <FaUserPlus className=' w-5 h-5' />
                </button>
                :
                <div className="px-3 py-1.5 flex items-center justify-center bg-emerald-800 text-white rounded-full hover:bg-emerald-700 select-none focus:outline-none focus:bg-red-800">
                Enrolled &nbsp; <FaCheck />
                </div>
            }
            </td>
        </tr>
        ))}
    </tbody>
    </table>
</div>
);
};


export default UserTable;

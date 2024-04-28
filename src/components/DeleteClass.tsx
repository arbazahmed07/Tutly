'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";



const DeleteClass = ({ classId, courseId }: { classId: string; courseId: string }) => {

    const router = useRouter();
    const [params, setParams] = useState({ classId, courseId });
    const handleDeleteClass = async () => {
        try {
            await axios.delete(`/api/classes/deleteClass/${params.classId}`);
            toast.success('Class deleted successfully');
            router.push(`/courses/${params.courseId}`);
            router.refresh();
        } catch (error) {
            console.error('Error deleting class:', error);
            toast.error('Failed to delete class');
        }
        finally {
            router.refresh();
        }
    }
    
    return 
    <button title="Delete" onClick={handleDeleteClass}> 
        <MdDelete className=" w-5 h-5 text-red-500" />
    </button>
}

export default DeleteClass;
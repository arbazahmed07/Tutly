"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlineSportsScore } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";





export default function StudentWiseAssignments ({ courses, assignments, userId }: any) {
const [currentCourse, setCurrentCourse] = useState<string>(courses[0]?.id);
const [isMounted, setIsMounted] = useState(false);
const router = useRouter();
const [unreviewed, setUnreviewed] = useState<string>('unreviewed');



useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return;
}

return (
<div className="flex flex-col gap-4">
    <div className="relative">
      <button
        onClick={() => router.back()}
        className="absolute -top-10 -left-10  p-2"
        >
        <IoMdArrowRoundBack className=" w-8 h-8" />
      </button>
    </div>
    <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
                {courses?.map((course: any) => {
                    return (
                    <button
                        onClick={() => setCurrentCourse(course.id)}
                        className={`rounded p-2 sm:w-auto ${currentCourse === course.id && "border rounded"
                        }`}
                        key={course.id}
                    >
                        <h1 className="truncate max-w-xs text-sm font-medium">{course.title}</h1>
                    </button>
                    );
                })}
        </div>
        <div>
            <button>
                <input type="radio" checked={unreviewed === 'reviewed'} value={unreviewed === 'reviewed' ? 'reviewed' : ''} name='status' id="reviewed" onChange={() => setUnreviewed('reviewed')} className="m-2" />
                <label htmlFor="reviewed">Reviewed</label>
            </button>
            <button>
                <input type="radio" checked={unreviewed === 'unreviewed'} value={unreviewed === 'unreviewed' ? 'unreviewed' : ''} name='status' id="unreviewed" onChange={() => setUnreviewed('unreviewed')} className="m-2" />
                <label htmlFor="unreviewed">UnReviewed</label>
            </button>
            <button>
                <input type="radio" checked={unreviewed === 'not-submitted'} value={unreviewed === 'not-submitted' ? 'not-submitted' : ''} name='status' id="not-submitted" onChange={() => setUnreviewed('not-submitted')} className="m-2" />
                <label htmlFor="not-submitted">Not Submitted</label>
            </button>
            <button>
                <input type="radio" checked={unreviewed === 'all'} value={unreviewed === 'all' ? 'all' : ''} name='status' id="all" onChange={() => setUnreviewed('all')} className="m-2" />
                <label htmlFor="all">All</label>
            </button>
        </div>
    </div>
    {
    
    unreviewed === 'all' 
        && 
    assignments.map((couse: any) => {
    if (couse.id !== currentCourse) return null;
    return couse.classes.map((cls: any) => {
        return cls.attachments.map((assignment: any) => {
        return (
            <div key={assignment.id} className="border rounded-lg p-1 md:p-3">
            <div className="flex items-center p-2 md:p-0 md:px-4 justify-around md:justify-between flex-wrap">
                <div className="flex md:flex-row items-center justify-between w-full flex-wrap">
                <div className="text-sm">
                    <h2 className="flex-1 font-medium m-2">{assignment.title}</h2>
                </div>
                <div className="flex gap-3 md:gap-6 items-center text-sm font-medium text-white flex-wrap">
                    {
                    assignment.submissions.length === 0 ?
                        <div className="flex gap-6 itens-center">
                        <div className="rounded-full p-2.5 bg-secondary-600">not submitted</div>
                        </div>
                        :
                        <div className="flex gap-2">
                        {
                            assignment.submissions.map((eachSubmission: any, index: number) => {
                            if (eachSubmission.points.length === 0) {
                                return (
                                <div className="flex gap-6 items-center" key={index}>
                                    <div className="rounded-full p-3 bg-yellow-600 hover:bg-yellow-500">Under review</div>
                                </div>
                                )
                            } else {
                                let total=0
                                return (
                                <div className="flex gap-6 items-center" key={index}>
                                    <div className="rounded-full p-2.5 bg-green-600 flex items-center">
                                    {eachSubmission.points.forEach((point:any)=>{
                                        total += point.score;
                                    })}
                                    <h1>
                                        Score : {total}
                                    </h1>
                                    <MdOutlineSportsScore className="inline sm:h-5 sm:w-5"/>
                                    </div>
                                </div>
                                )
                            }
                            })
                        }
                        </div>
                    }
                    <button
                    title="Details"
                    onClick={() => {
                        if (userId) {
                        router.push(`/assignments/${assignment.id}?userId=${userId}`);
                        } else {
                        router.push(`/assignments/${assignment.id}`);
                        }
                    }
                    }
                    className="p-2.5 bg-blue-500 rounded"
                    >
                    View Details
                    </button>
                </div>
                </div>
            </div>
            </div>
        );
        });
    });
    })}
    {
    (unreviewed === 'reviewed' || unreviewed === 'unreviewed' )  &&
        assignments.map((course: any) => {
        if (course.id !== currentCourse) return null;
        return course.classes.map((cls: any) => {
        return cls.attachments.map((assignment: any,index:number) => {
            if(assignment.submissions.length === 0 ) return (
            <div hidden={index != 0}>
                <h1 className="text-2xl text-center mt-4 mb-10 text-red-600 font-medium">
                No submissions to reviewed yet...
                </h1>
            </div>
            )
            return (
            <div key={assignment.id} className="border rounded-lg p-1 md:p-3">
                <div className="flex items-center p-2 md:p-0 md:px-4 justify-around md:justify-between flex-wrap">
                <div className="flex md:flex-row items-center justify-between w-full flex-wrap">
                    <div className="text-sm">
                    <h2 className="flex-1 font-medium m-2">{assignment.title}</h2>
                    </div>
                    <div className="flex gap-3 md:gap-6 items-center text-xs font-medium text-white flex-wrap">
                    {
                        assignment.submissions.length > 0 &&
                        <div className="flex gap-2">
                            {
                            assignment.submissions.map((eachSubmission: any, index: number) => {
                                if (eachSubmission.points.length !== 0 && unreviewed !== 'reviewed' ) {
                                return (
                                    <div className="flex gap-6 items-center" key={index}>
                                        <div className="rounded-full p-3 bg-yellow-600 hover:bg-yellow-500">Under review</div>
                                    </div>
                                )
                                } else if(eachSubmission.points.length !== 0 && unreviewed === 'reviewed') {
                                let total=0
                                return (
                                    <div className="flex gap-6 items-center" key={index}>
                                    <div className="rounded-full p-2.5 bg-green-600 flex items-center">
                                        {eachSubmission.points.forEach((point:any)=>{
                                        total += point.score;
                                        })}
                                        <h1>
                                        Score : {total}
                                        </h1>
                                        <MdOutlineSportsScore className="inline sm:h-5 sm:w-5"/>
                                    </div>
                                    </div>
                                )
                                }
                            })
                            }
                        </div>
                    }
                    <button
                    title="Details"
                        onClick={() => {
                        if (userId) {
                            router.push(`/assignments/${assignment.id}?userId=${userId}`);
                        } else {
                            router.push(`/assignments/${assignment.id}`);
                        }
                        }
                        }
                        className="p-2.5 bg-blue-500 rounded"
                    >
                        View Details
                    </button>
                    </div>
                </div>
                </div>
            </div>
            );
        });
        });
    })
    }
    {
    unreviewed === 'not-submitted' &&
            assignments.map((course: any) => {
        if (course.id !== currentCourse) return null;
        return course.classes.map((cls: any) => {
            return cls.attachments.map((assignment: any) => {
            if (assignment.submissions.length > 0) return null;
            return (
                <div key={assignment.id} className="border rounded-lg p-1 md:p-3">
                <div className="flex items-center p-2 md:p-0 md:px-4 justify-around md:justify-between flex-wrap">
                    <div className="flex md:flex-row items-center justify-between w-full flex-wrap">
                    <div className="text-sm">
                        <h2 className="flex-1 font-medium m-2">{assignment.title}</h2>
                    </div>
                    <div className="flex gap-3 md:gap-6 items-center text-sm font-medium text-white flex-wrap">
                        {
                        assignment.submissions.length === 0 &&
                        <div className="flex gap-6 itens-center">
                            <div className="rounded-full p-2 px-3 bg-secondary-600">not submitted</div>
                        </div>
                        }
                        <button
                        title="btn"
                        onClick={() => {
                            if (userId) {
                            router.push(`/assignments/${assignment.id}?userId=${userId}`);
                            } else {
                            router.push(`/assignments/${assignment.id}`);
                            }
                        }
                        }
                        className="p-2 px-4 bg-blue-500 rounded"
                        >
                        View Details
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            );
            });
        });
        })
    }
</div>
);
}
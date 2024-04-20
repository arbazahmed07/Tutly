'use client'

    import React from 'react';
    import { useRouter } from 'next/navigation';
    import { GiArrowScope } from 'react-icons/gi';
    import Image from 'next/image';
    import { PiMedalDuotone } from 'react-icons/pi';
    import badge1 from '/public/assets/badge1.svg';
    import badge2 from '/public/assets/badge2.svg';
    import badge3 from '/public/assets/badge3.svg';

    
    
    interface Point {
    id: string;
    category: string;
    feedback: string | null;
    score: number;
    userAssignmentId: string | null;
    }

    interface Submission {
    id: string;
    userId: string;
    attachmentId: string;
    dueDate: string;
    overallFeedback: string | null;
    points: Point[];
    assignment: {
        class: {
        course: {
            id: string;
            title: string;
            startDate: string;
        } | null;
        }   | null;
    };
    }

    interface RowProps {
    id: string;
    rank: number;
    img: string ;
    name: string;
    username: string;
    points: number;
    badge: JSX.Element;
    }

    const Row: React.FC<RowProps> = ({ id, rank, img, name, username, points, badge }) => {
    const router = useRouter();



    let rankColorClass = "";
    switch (rank) {
        case 1:
        rankColorClass = "";
        break;
        case 2:
        rankColorClass = " ";
        break;
        case 3:
        rankColorClass = " ";
        break;
        default:
        rankColorClass = "";
    }

    let BadgeColorClass = "";
    switch (rank) {
        case 1:
        BadgeColorClass =
            "bg-yellow-600 outline outline-yellow-400  bg-gradient-to-r from-rgb(239,242,18) via-rgb(229,232,64) to-rgb(225,202,2)";
        break;
        case 2:
        BadgeColorClass = "bg-slate-400  outline outline-gray-300";
        break;
        case 3:
        BadgeColorClass = " bg-yellow-700 outline outline-amber-500";
        break;
        default:
        BadgeColorClass = "outline outline-emerald-500  ";
    }

    return (
        <tr
        className={`flex flex-col md:flex-row items-center border border-slate-900 w-full hover:bg-primary-700   `}
        >
        <td className="p-2 text-center ms-2 me-5">{badge}</td>
        <td className="text-md p-0 text-center me-5">
            <div
            className={`p-2 w-full h-full me-5 flex items-center justify-center font-semibold bg-gray-500 border border-gray-50 border-spacing-4 outline-offset-2 text-gray-50 rounded-full ${BadgeColorClass}`}
            >
            {rank}
            </div>
        </td>
        <td className="p-4 me-5 flex items-center">
            {/* <img src={img} alt={name} className="w-9 me-3 h-9 mr-4 border border-gray-700 border-opacity-45 outline outline-offset-2 outline-1 rounded-full"            /> */}
            <div className="w-80">
            <div className="font-bold">{name}</div>
            <div className="text-gray-600">@{username}</div>
            </div>
        </td>
        <td className="p-4 me-5 flex items-center flex-grow justify-end">
            <div className="flex text-xl font-medium items-center justify-end">
            {points} &nbsp;
            <GiArrowScope className="text-red-700 w-8 h-8" />
            </div>
        </td>
        </tr>
    );
    };

    interface LeaderboardProps {
        submissions: Submission[];
    }

    const StudentTable: React.FC<LeaderboardProps> = ({ submissions }) => {
    const [sortedStudents, setSortedStudents] = React.useState(submissions);

    const [loading, setLoading] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState("");

    const router = useRouter();

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    React.useEffect(() => {
        if (sortedStudents?.length > 0) {
        const sortedStudentsCopy = [...sortedStudents];
        sortedStudentsCopy.sort((a, b) => {
            const cat1 = a.points.reduce((acc, curr) => acc + curr.score, 0);
            const cat2 = b.points.reduce((acc, curr) => acc + curr.score, 0);
            return cat2 - cat1; 
        });
        setSortedStudents(sortedStudentsCopy);
        }
    }, [sortedStudents]);

    const rankMap = new Map();

    sortedStudents.forEach((student, index) => {
        rankMap.set(student.id, index + 1);
    });

    const badgeMap = new Map();
    sortedStudents.forEach((student, index) => {
        switch (rankMap.get(student.id)) {
        case 1:
            badgeMap.set(student.id, <Image src={badge1} alt="badge1" width={30} height={30} />);
            break;
        case 2:
            badgeMap.set(student.id, <Image src={badge2} alt="badge2" width={30} height={30} />);
            break;
        case 3:
            badgeMap.set(student.id, <Image src={badge3} alt="badge3" width={30} height={30} />);
            break;
        default:
            badgeMap.set(student.id, <PiMedalDuotone className="h-7 w-7 text-zinc-700" />);
        }
    });

    return (
        <table>
        <tbody>
            {sortedStudents.map((student, index) => (
            <Row
                key={student.id}
                id={student.id}
                rank={index + 1}
                img={`profile_images/${student.userId}.jpg`}
                name={student.userId} 
                username={student.userId} 
                points={student.points.reduce((acc, curr) => acc + curr.score, 0)} // Calculate total points
                badge={badgeMap.get(student.id) || <PiMedalDuotone className="h-7 w-7 text-zinc-700" />} // Provide default badge if not found
            />
            ))}
        </tbody>
        </table>
    );
    };

    export default StudentTable;

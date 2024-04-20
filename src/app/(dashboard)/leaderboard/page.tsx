import getLeaderboardData from "@/actions/getLeaderboard";
import { useRouter } from "next/router";
import LeaderboardComponent from "./leaderBoard";

// const Row = ({ id, rank, img, name, username, points, badge }) => {
//     const router = useRouter();

//     let rankColorClass = "";
//     switch (rank) {
//         case 1:
//         rankColorClass = "hover:bg-yellow-500  ";
//         break;
//         case 2:
//         rankColorClass = "hover:bg-slate-400 ";
//         break;
//         case 3:
//         rankColorClass = "hover:bg-amber-700 ";
//         break;
//         default:
//         rankColorClass = "";
//     }

//     let BadgeColorClass = "";
//     switch (rank) {
//         case 1:
//         BadgeColorClass =
//             "bg-yellow-600 outline outline-yellow-400  bg-gradient-to-r from-rgb(239,242,18) via-rgb(229,232,64) to-rgb(225,202,2)";
//         break;
//         case 2:
//         BadgeColorClass = "bg-slate-400  outline outline-gray-300";
//         break;
//         case 3:
//         BadgeColorClass = " bg-yellow-700 outline outline-amber-500";
//         break;
//         default:
//         BadgeColorClass = "outline outline-emerald-500  ";
//     }

//     return (
//         <tr
//         onClick={() => router.push(`/profile/${id}`)}
//         className={`flex flex-col md:flex-row items-center border border-slate-900 ${
//             !rankColorClass && "hover:bg-sky-200"
//         } cursor-pointer ${rankColorClass} transition-transform hover:scale-105 hover:shadow-lg duration-500 ease-in-out `}
//         >
//         <td className="p-2 text-center ms-2 me-5">{badge}</td>
//         <td className="text-md p-0 text-center me-5">
//             <div
//             className={`p-2 w-full h-full me-5 flex items-center justify-center font-semibold bg-gray-500 border border-gray-50 border-spacing-4 outline-offset-2 text-gray-50 rounded-full ${BadgeColorClass}`}
//             >
//             {rank}
//             </div>
//         </td>
//         <td className="p-4 me-5 flex items-center">
//             <img
//             src={img}
//             alt={name}
//             className="w-9 me-3 h-9 mr-4 border border-gray-700 border-opacity-45 outline outline-offset-2 outline-1 rounded-full"
//             />
//             <div className="w-80">
//             <div className="font-bold">{name}</div>
//             <div className="text-gray-600">@{username}</div>
//             </div>
//         </td>
//         <td className="p-4 me-5 flex items-center flex-grow justify-end">
//             <div className="flex text-xl font-medium items-center justify-end">
//             {points} &nbsp;
//             </div>
//         </td>
//         </tr>
//     );
// };


export default async function Leaderboard() {

    const points: any = await getLeaderboardData();
    
    return (
        <div>Leaderboard

            <pre>
                {JSON.stringify(points, null, 2)}
            </pre>

            <div>
                start here
                <LeaderboardComponent submissions={points} />
            </div>
        </div>
    )
}
import getLeaderboardData from "@/actions/getLeaderboard";
import { useRouter } from "next/router";
import StudentTable from "./leaderBoard";




export default async function Leaderboard() {

    const points: any = await getLeaderboardData();
    
    return (
        <div>Leaderboard

            <pre>
                {JSON.stringify(points, null, 2)}
            </pre>

            <div>
                start here
                {/* <LeaderboardComponent submissions={points} /> */}
                <StudentTable submissions={points} />
            </div>
        </div>
    )
}
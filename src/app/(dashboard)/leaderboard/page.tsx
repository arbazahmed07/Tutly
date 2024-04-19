import getLeaderboardData from "@/actions/getLeaderboard";

export default async function Leaderboard() {

    const points = await getLeaderboardData();
    return (
        <div>Leaderboard

            <pre>
                {JSON.stringify(points, null, 2)}
            </pre>
        </div>
    )
}
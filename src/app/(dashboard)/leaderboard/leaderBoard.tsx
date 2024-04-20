    import React from 'react';

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
            }  | null;
        };
    }

    interface LeaderboardProps {
        submissions: Submission[];
    }

    const Leaderboard: React.FC<LeaderboardProps> = ({ submissions }) => {
    return (
        <div className="leaderboard-container">
        <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
        <div className="grid grid-cols-2 gap-4">
            {submissions.map(submission => (
            <div key={submission.id} className="submission-card bg-gray-100 p-4 rounded-lg">
                <img src={`profile_images/${submission.userId}.jpg`} alt={`Profile for user ${submission.userId}`} className="w-16 h-16 rounded-full mb-2" />
                <p className="font-semibold text-gray-800 mb-1">User ID: {submission.userId}</p>
                <p className="text-gray-600 mb-1">Points:</p>
                <ul className="list-disc list-inside">
                {submission.points.map(point => (
                    <li key={point.id}>{point.category}: {point.score}</li>
                ))}
                </ul>
            </div>
            ))}
        </div>
        </div>
    );
    };

    export default Leaderboard;

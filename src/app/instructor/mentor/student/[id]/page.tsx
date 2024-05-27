import {
    getMentorPieChartData,
    getStudentEvaluatedAssigmentsForMentor,
  } from "@/actions/assignments";
  import StudentStatClient from "@/components/studentStatClient";
  
  export default async function Page({params}:any) {
    const mentorPieChart = await getMentorPieChartData();
    const { evaluated, underReview, unsubmitted, totalPoints}:any = await getStudentEvaluatedAssigmentsForMentor(params.id);
    let loaderValue = !mentorPieChart
      ? 0
      : String(
          (mentorPieChart![0] * 100) / (mentorPieChart![0] + mentorPieChart![1])
        );
    loaderValue += "%";
    const sampleData: string[] = [
      "2024-05-01",
      "2024-05-02",
      "2024-05-03",
      "2024-05-15",
      "2024-05-16",
      "2024-05-17",
      // Add more dates
    ];
  
    return (
      <div>
        <h1 className="text-blue-400 text-2xl p-10 font-bold">Student - {params.id}</h1>
        <StudentStatClient 
        totalEvaluatedAssigmentsOfStudent={evaluated}
        totalPoints={totalPoints}
        forBarChart={[evaluated,underReview,unsubmitted]}
        />
      </div>
    );
  }
  
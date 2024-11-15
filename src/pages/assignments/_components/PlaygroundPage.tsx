import NoDataFound from "@/components/NoDataFound";
import Playground from "@/pages/playgrounds/_components/Playground";

import EvaluateSubmission from "./evaluateSubmission";

export default function PlaygroundPage({ submission }: { submission: any }) {
  if (!submission) return <NoDataFound message="No submission found" />;
  return (
    <div>
      <EvaluateSubmission submission={submission} />
      <Playground initialFiles={submission.data} />
    </div>
  );
}


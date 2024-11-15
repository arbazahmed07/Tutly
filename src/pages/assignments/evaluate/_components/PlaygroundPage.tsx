import NoDataFound from "@/components/NoDataFound";

import EvaluateSubmission from "./EvaluateSubmission";
import Playground from "@/pages/playgrounds/_components/Playground";


export const PlaygroundPage = async ({ submission }: { submission: any }) => {
    if (!submission) return <NoDataFound message="No submission found" />;
    return (
      <div>
        <EvaluateSubmission submission={submission} />
        {submission.assignment.submissionMode === "EXTERNAL_LINK" ? (
          <iframe
            src={submission.submissionLink ?? ""}
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            className="h-[93vh] w-full"
          />
        ) : (
          <Playground initialFiles={submission.data} />
        )}
      </div>
    );
  };
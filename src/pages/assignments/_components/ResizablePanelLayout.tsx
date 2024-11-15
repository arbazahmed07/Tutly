import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SubmissionList } from "./submissionList";
import PlaygroundPage from "./PlaygroundPage";

interface ResizablePanelLayoutProps {
  assignmentId: string;
  assignment: any;
  submissions: any[];
  submissionId: string | null;
  username: string | null;
  submission: any;
}

export function ResizablePanelLayout({
  assignmentId,
  assignment,
  submissions,
  submissionId,
  username,
  submission,
}: ResizablePanelLayoutProps) {
  return (
    <ResizablePanelGroup direction="horizontal" className="max-h-[95vh] w-full">
      <ResizablePanel defaultSize={20}>
        <SubmissionList
          assignmentId={assignmentId}
          assignment={assignment}
          submissions={submissions}
          searchParams={{ submissionId, username }}
          username={username}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <PlaygroundPage submission={submission} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
} 
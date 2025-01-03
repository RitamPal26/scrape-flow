import { InboxIcon, Loader2Icon } from "lucide-react";
import { Suspense } from "react";

import Topbar from "@/app/workflow/_components/topbar/Topbar";
import ExecutionViewer from "./_components/ExecutionViewer";

import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";

export default async function ExecutionViewerPage(props: {
  params: Promise<{ workflowId: string; executionId: string }>;
}) {
  const params = await props.params;
  const { workflowId, executionId } = params;

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <Topbar
        workflowId={workflowId}
        title="Workflow run details"
        subtitle={`Run ID: ${executionId}`}
        hideButtons
      />
      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex w-full items-center justify-center">
              <Loader2Icon className="size-10 animate-spin stroke-primary" />
            </div>
          }
        >
          <ExecutionViewerWrapper executionId={executionId} />
        </Suspense>
      </section>
    </div>
  );
}

async function ExecutionViewerWrapper({
  executionId,
}: {
  executionId: string;
}) {
  const workflowExecution = await GetWorkflowExecutionWithPhases(executionId);
  if (!workflowExecution) {
    return <div>Not found</div>;
  }

  return <ExecutionViewer execution={workflowExecution} />;
}

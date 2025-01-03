import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Editor from "@/app/workflow/_components/Editor";

async function WorkflowPage(props: {
  params: Promise<{ workflowId: string }>;
}) {
  const params = await props.params;
  // https://nextjs.org/docs/messages/sync-dynamic-apis
  const { workflowId } = params;

  const { userId } = await auth();
  if (!userId) {
    return <div>unauthenticated</div>;
  }

  const workflow = await prisma.workflow.findUnique({
    where: { id: workflowId, userId },
  });

  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return <Editor workflow={workflow} />;
}

export default WorkflowPage;

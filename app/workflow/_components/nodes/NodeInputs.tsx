import React from "react";

import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import useFlowValidation from "@/hooks/useFlowValidation";

import { Handle, Position, useEdges } from "@xyflow/react";

import NodeParamField from "./NodeParamField";
import { ColorHandle } from "./common";

export function NodeInputs({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1 divide-y">{children}</div>;
}

export function NodeInput({
  input,
  nodeId,
}: {
  input: TaskParam;
  nodeId: string;
}) {
  const edges = useEdges();
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  );

  const { invalidInputs } = useFlowValidation();
  const hasErrors = invalidInputs
    .find((node) => node.nodeId === nodeId)
    ?.inputs.find((invalidInput) => invalidInput === input.name);

  return (
    <div
      className={cn(
        "relative flex w-full justify-start bg-secondary p-3",
        hasErrors && "bg-destructive/30"
      )}
    >
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />

      {!input.hideHandle && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type="target"
          position={Position.Left}
          className={cn(
            "!-left-2 !size-4 !border-2 !border-background !bg-muted-foreground",
            ColorHandle[input.type]
          )}
        />
      )}
    </div>
  );
}

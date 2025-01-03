"use client";

import { CheckIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";

import { UpdateWorkflow } from "@/actions/workflows/updateWorkflow";
import { Button } from "@/components/ui/button";

function SaveButton({ workflowId }: { workflowId: string }) {
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: UpdateWorkflow,
    onSuccess: () => {
      toast.success("Flow saved successfully", { id: "save-workflow" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "save-workflow" });
    },
  });

  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={() => {
        const workflowDef = JSON.stringify(toObject());
        toast.loading("Saving Workflow", { id: "save-workflow" });
        saveMutation.mutate({
          id: workflowId,
          definition: workflowDef,
        });
      }}
      disabled={saveMutation.isPending}
    >
      <CheckIcon size={16} className="stroke-green-400" />
      Save
    </Button>
  );
}

export default SaveButton;
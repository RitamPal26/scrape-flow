"use client";

import useExecutionPlan from "@/hooks/useExecutionPlan";

import { Button } from "@/components/ui/button";
import { DownloadIcon, UploadIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useReactFlow } from "@xyflow/react";

import { useMutation } from "@tanstack/react-query";

import { UnpublishWorkflow } from "@/actions/workflows/unpublishWorkflow";

const UnpublishBtn = ({ workflowId }: { workflowId: string }) => {

  const mutation = useMutation({
    mutationFn: UnpublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow unpublished!!", { id: "workflowId" });
    },
    onError: () => {
      toast.error("Workflow Failed!!", { id: "workflowId" });
    },
  });

  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading("Unpublishing Workflow...", { id: "workflowId" });
        mutation.mutate(workflowId);
      }}
    >
      <DownloadIcon size={16} className="stroke-orange-400" />
      Unpublish
    </Button>
  );
};

export default UnpublishBtn;

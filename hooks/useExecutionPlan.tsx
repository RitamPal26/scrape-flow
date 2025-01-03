import {
  FlowToExecutionPlan,
  FlowToExecutionPlanValidationError,
} from "@/lib/workflow/executionPlan";
import { AppNode, AppNodeMissingInputs } from "@/types/appNode";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import useFlowValidation from "./useFlowValidation";
import { toast } from "sonner";

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const { clearErrors, setInvalidInputs } = useFlowValidation();

  const handleError = useCallback(
    (error: {
      type: FlowToExecutionPlanValidationError;
      invalidElements?: AppNodeMissingInputs[];
    }) => {
      switch (error.type) {
        case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
          toast.error("No entry point found");
          break;
        case FlowToExecutionPlanValidationError.INVALID_INPUTS:
          toast.error("Not all inputs values are set");
          setInvalidInputs(error.invalidElements!);

          break;

        default:
          toast.error("Something went wrong");
          break;
      }
    },
    [setInvalidInputs]
  );

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan, error } = FlowToExecutionPlan(
      nodes as AppNode[],
      edges
    );

    if (error) {
      handleError(error);
      return null;
    }

    clearErrors();
    return executionPlan;
  }, [toObject, handleError, clearErrors]);

  return generateExecutionPlan;
};

export default useExecutionPlan;
"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { ReactNode } from "react";

interface Props {
  children: React.ReactNode;
  content: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

function TooltipWrapper(props: Props) {
  if(!props.content) return props.children
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent side={props.side}>{props.content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default TooltipWrapper;
import React, { Suspense } from "react";

import { GetPeriods } from "@/actions/analytics/getPeriods";
import { Period } from "@/types/analytics";

import PeriodSelector from "./_components/PeriodSelector";

import { Skeleton } from "@/components/ui/skeleton";
import { GetStatsCardsValues } from "@/actions/analytics/getStatsCardsValues";
import { GetWorkflowExecutionStats } from "@/actions/analytics/getWorkflowExecutionStats";
import { GetCreditsUsageInPeriod } from "@/actions/analytics/getCreditUsageInperiod";

import { CirclePlayIcon, CoinsIcon, WaypointsIcon } from "lucide-react";

import StatsCard from "./_components/StatsCard";
import ExecutionStatsChart from "./_components/ExecutionStatusChart";
import CreditsUsageChart from "@/app/(dashboard)/billing/_components/CreditUsageChart";

async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    month?: string;
    year?: string;
  }>;
}) {
  const currentDate = new Date();
  const { month, year } = await searchParams;

  const period: Period = {
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear(),
  };

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Home</h1>
        <Suspense fallback={<Skeleton className="h-[40px] w-[180px]" />}>
          <PeriodSelectorWrapper selectedPeriod={period} />
        </Suspense>
      </div>

      <div className="flex h-full flex-col gap-4 py-6">
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsCards selectedPeriod={period} />
        </Suspense>
      

      <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
        <StatsExecutionStatus selectedPeriod={period} />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
        <CreditsUsageInPeriod selectedPeriod={period} />
      </Suspense>

      </div>
    </div>
  );
}

async function PeriodSelectorWrapper({
  selectedPeriod,
}: {
  selectedPeriod: Period;
}) {
  const periods = await GetPeriods();

  return <PeriodSelector periods={periods} selectedPeriod={selectedPeriod} />;
}

async function StatsCards({ selectedPeriod }: { selectedPeriod: Period }) {
  const data = await GetStatsCardsValues(selectedPeriod);

  return (
    <div className="grid min-h-[120px] gap-3 lg:grid-cols-3 lg:gap-8">
      <StatsCard
        title="Workflow executions"
        value={data.workflowExecutions}
        icon={CirclePlayIcon}
      />
      <StatsCard
        title="Phase executions"
        value={data.phaseExecutions}
        icon={WaypointsIcon}
      />
      <StatsCard
        title="Credits consumed"
        value={data.creditsConsumed}
        icon={CoinsIcon}
      />
    </div>
  );
}

function StatsCardSkeleton() {
  return (
    <div className="grid gap-3 lg:grid-cols-3 lg:gap-8">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="min-h-[120px] w-full" />
      ))}
    </div>
  );
}

async function StatsExecutionStatus({
  selectedPeriod,
}: {
  selectedPeriod: Period;
}) {
  const data = await GetWorkflowExecutionStats(selectedPeriod);

  return <ExecutionStatsChart data={data} />;
}

async function CreditsUsageInPeriod({
  selectedPeriod,
}: {
  selectedPeriod: Period;
}) {
  const data = await GetCreditsUsageInPeriod(selectedPeriod);

  return (
    <CreditsUsageChart
      data={data}
      title="Daily credits spent"
      description="Daily credits consumed in selected period"
    />
  );
}

export default HomePage;

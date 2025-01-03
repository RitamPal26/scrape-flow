import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CoinsIcon } from "lucide-react";
import ReactCountupWrapper from "@/components/ReactCountUpWrapper";

import { getAvailableCredits } from "@/actions/billing/getAvailableCredits";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import CreditsPurchase from "./_components/CreditsPurchase";
export default function BillingPage() {
  return (
    <div className="mx-auto space-y-8 p-4">
      <h1 className="text-3xl font-bold">Billing</h1>
      <Suspense fallback={<Skeleton className="h-[166px] w-full" />}>
        <BalanceCard />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[166px] w-full" />}>
        <CreditsPurchase  />
      </Suspense>
    </div>
  );
}

async function BalanceCard() {
  const userBalance = await getAvailableCredits();
  return (
    <Card className="flex flex-col justify-between overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-background shadow-lg">
      <CardContent className="relative items-center p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="mb-1 text-lg font-semibold text-foreground">
              Avaliable Credits
            </h3>
            <p className="text-4xl font-bold text-primary">
              <ReactCountupWrapper value={userBalance} />
            </p>
          </div>

          <CoinsIcon
            className="absolute bottom-0 right-0 text-primary opacity-20"
            size={140}
          />
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        When your credit balance reaches zero, your workflows will stop working
      </CardFooter>
    </Card>
  );
}

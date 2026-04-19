"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentSuccessCard = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    // cache invalidate — fresh data
    queryClient.invalidateQueries({ queryKey: ["payment"] });
    queryClient.invalidateQueries({ queryKey: ["my-lease"] });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-100 gap-4">
      <div className="rounded-full bg-green-100 p-4">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      <h1 className="text-xl font-semibold">Payment successful</h1>
      <p className="text-muted-foreground text-sm">
        Your payment has been processed
      </p>
      <Button onClick={() => router.push("/payment")}>View payments</Button>
    </div>
  );
};

export default PaymentSuccessCard;

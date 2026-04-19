"use client";

import { Button } from "@/components/ui/button";
import { useConfirmLease } from "@/hooks/useLease";

export const ConfirmLeaseButton = ({ leaseId }: { leaseId: string }) => {
  const { mutate, isPending } = useConfirmLease(leaseId);

  return (
    <Button className="w-full" onClick={() => mutate()} disabled={isPending}>
      {isPending ? "Confirming..." : "Confirm lease"}
    </Button>
  );
};

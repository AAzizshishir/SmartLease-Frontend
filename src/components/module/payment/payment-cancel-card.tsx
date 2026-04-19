import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const PaymentCancelCard = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-100 gap-4">
      <div className="rounded-full bg-red-100 p-4">
        <XCircle className="h-10 w-10 text-red-500" />
      </div>
      <h1 className="text-xl font-semibold">Payment cancelled</h1>
      <p className="text-muted-foreground text-sm">
        Your payment was not completed
      </p>
      <Button onClick={() => router.push("/tenant/lease")}>
        Back to lease
      </Button>
    </div>
  );
};

export default PaymentCancelCard;

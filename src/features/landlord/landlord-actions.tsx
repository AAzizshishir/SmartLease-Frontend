"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LandlordActions = ({ unitId }: { unitId: string }) => {
  const router = useRouter();
  return (
    <div className="flex justify-end space-x-2">
      <Button
        variant="outline"
        onClick={() => router.push(`/edit-unit/${unitId}`)}
      >
        Edit Unit
      </Button>
      <Button variant="destructive">Delete Unit</Button>
    </div>
  );
};

export default LandlordActions;

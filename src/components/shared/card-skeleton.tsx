import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CardSkeleton = () => (
  <Card>
    <Skeleton className="h-48 w-full" />
    <CardHeader>
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-1/2" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-3 w-1/3 mb-2" />
      <Skeleton className="h-8 w-full mt-4" />
    </CardContent>
  </Card>
);

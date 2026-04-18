import { Skeleton } from "@/components/ui/skeleton";

export const ListSkeleton = () => (
  <div className="flex items-center gap-4">
    <Skeleton className="h-12 w-full rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  </div>
);

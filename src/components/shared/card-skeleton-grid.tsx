import { CardSkeleton } from "./card-skeleton";

interface Props {
  count?: number;
}

export const CardSkeletonGrid = ({ count = 6 }: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {[...Array(count)].map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

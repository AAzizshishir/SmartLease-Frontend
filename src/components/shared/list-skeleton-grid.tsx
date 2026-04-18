import { ListSkeleton } from "./list-skeleton";

interface Props {
  count?: number;
}

export const ListSkeletonGrid = ({ count = 6 }: Props) => (
  <div className="grid grid-cols-1 gap-4">
    {[...Array(count)].map((_, i) => (
      <ListSkeleton key={i} />
    ))}
  </div>
);

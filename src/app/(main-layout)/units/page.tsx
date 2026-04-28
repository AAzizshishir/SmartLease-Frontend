import UnitCard from "@/components/module/unit/unit-card";
import { unitService } from "@/services/unit.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface Props {
  searchParams: { page?: string; limit?: string };
}

const UnitPage = async ({ searchParams }: Props) => {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 5;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["unit", { page, limit }],
    queryFn: () => unitService.getAll({ page, limit }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UnitCard />
      {/* <Pagination /> */}
    </HydrationBoundary>
  );
};

export default UnitPage;

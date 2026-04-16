import UnitDetailsCard from "@/components/module/unit/unit-details-card";
import { unitService } from "@/services/unit.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const UnitDetailsPage = async ({
  params,
}: {
  params: Promise<{ unit_id: string }>;
}) => {
  const { unit_id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["unit", unit_id],
    queryFn: () => unitService.getById(unit_id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UnitDetailsCard />
    </HydrationBoundary>
  );
};

export default UnitDetailsPage;

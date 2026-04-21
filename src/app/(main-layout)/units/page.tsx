import UnitCard from "@/components/module/unit/unit-card";
import { unitService } from "@/services/unit.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const UnitPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["unit"],
    queryFn: () => unitService.getAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UnitCard />
    </HydrationBoundary>
  );
};

export default UnitPage;

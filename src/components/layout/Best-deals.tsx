import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { unitService } from "@/services/unit.service";
import UnitCard from "../module/unit/unit-card";

const BestDeals = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["unit", { limit: 3 }],
    queryFn: () => unitService.getAll({ limit: 3 }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="Text-primary text-[#ff9638] font-bold pl-10">
            Best Deals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UnitCard limit={3} />
        </CardContent>
      </Card>
    </HydrationBoundary>
  );
};

export default BestDeals;

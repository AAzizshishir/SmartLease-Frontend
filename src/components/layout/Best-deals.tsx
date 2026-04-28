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
    queryKey: ["unit", { limit: 3, sortBy: "monthly_rent", sortOrder: "asc" }],
    queryFn: () =>
      unitService.getAll({
        limit: 3,
        sortBy: "monthly_rent",
        sortOrder: "asc",
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="text-[#ff9638] font-bold pl-10">
            Best Deals
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Reuse UnitCard with props */}
          <UnitCard limit={3} sortBy="monthly_rent" sortOrder="asc" />
        </CardContent>
      </Card>
    </HydrationBoundary>
  );
};

export default BestDeals;

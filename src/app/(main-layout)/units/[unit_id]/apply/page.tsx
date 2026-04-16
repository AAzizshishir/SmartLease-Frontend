import LeaseApplicationCard from "@/components/module/lease-application/lease-application";

const LeaseApplyPage = async ({
  params,
}: {
  params: Promise<{ unit_id: string }>;
}) => {
  const { unit_id } = await params;
  return (
    <div>
      <LeaseApplicationCard unitId={unit_id} />
      Hello
    </div>
  );
};

export default LeaseApplyPage;

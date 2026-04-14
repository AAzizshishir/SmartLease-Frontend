import AddUnitCard from "@/components/module/unit/add-unit-card";

const AddUnitPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      <AddUnitCard propertyId={id} />
    </div>
  );
};

export default AddUnitPage;

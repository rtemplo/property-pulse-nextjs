type PageProps = {
  params: Promise<{ id: string }>;
};
const PropertyPage = async ({ params }: PageProps) => {
  const { id } = await params;
  return (
    <div>
      <div>Property Page {id}</div>
    </div>
  );
};

export default PropertyPage;

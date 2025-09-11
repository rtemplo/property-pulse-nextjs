import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyImages from '@/components/PropertyImages';
import BookmarkButton from '@/components/BookmarkButton';
import ShareButtons from '@/components/ShareButtons';
import PropertyContactForm from '@/components/PropertyContactForm';

import connectDB from '@/config/database';
import Property from '@/models/Property';

type PageProps = {
  params: Promise<{ id: string }>;
};

const PropertyPage = async ({ params }: PageProps) => {
  const { id } = await params;
  await connectDB();
  const property = await Property.findById(id).lean();

  return (
    <>
      <PropertyHeaderImage image={property?.images[0] || ''} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link href="/properties" className="text-blue-500 hover:text-blue-600 flex items-center">
            <FaArrowLeft className="mr-2" />
            Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[70%_28%] w-full gap-6">
            {property ? (
              <>
                <PropertyDetails property={property} />
                <aside className="space-y-4">
                  <BookmarkButton property={property} />
                  <ShareButtons property={property} />
                  <PropertyContactForm property={property} />
                </aside>
              </>
            ) : (
              <div className="col-span-1 md:col-span-2">
                <p className="text-gray-500">Property not found</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <PropertyImages images={property?.images || []} />
    </>
  );
};

export default PropertyPage;

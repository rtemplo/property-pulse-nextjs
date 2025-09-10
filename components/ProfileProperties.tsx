'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PropertyDocument } from '@/models/Property';

interface ProfilePropertiesProps {
  initialProperties: PropertyDocument[];
}

const ProfileProperties: React.FC<ProfilePropertiesProps> = ({ initialProperties }) => {
  const [properties, setProperties] = useState<PropertyDocument[]>(initialProperties);

  return (
    <div>
      {properties.map((property, index) => (
        <div className="mb-10" key={index}>
          <Link href={`/properties/${property._id}`}>
            <Image
              className="h-32 w-full rounded-md object-cover"
              src={property.images?.[0]}
              alt=""
              width={1000}
              height={400}
            />
          </Link>
          <div className="mt-2">
            <p className="text-lg font-semibold">{property.name}</p>
            <p className="text-gray-600">
              Address:{' '}
              {`${property.location?.street} ${property.location?.city}, ${property.location?.state}`}
            </p>
          </div>
          <div className="mt-2">
            <a
              href="/add-property.html"
              className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
            >
              Edit
            </a>
            <button
              className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileProperties;

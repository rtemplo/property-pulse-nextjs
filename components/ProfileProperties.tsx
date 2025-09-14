'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SerializableProperty } from '@/models/Property';
import deleteProperty from '@/app/actions/deleteProperty';
import { toast } from 'react-toastify';

interface ProfilePropertiesProps {
  initialProperties: SerializableProperty[];
}

const ProfileProperties: React.FC<ProfilePropertiesProps> = ({ initialProperties }) => {
  const [properties, setProperties] = useState<SerializableProperty[]>(initialProperties);

  const handleDeleteProperty = async (propertyId: string) => {
    const confirmed = confirm('Are you sure you want to delete this property?');

    if (!confirmed) {
      return;
    }

    try {
      await deleteProperty(propertyId);
      setProperties((prev) => prev.filter((p) => p._id.toString() !== propertyId));
      toast.success('Property deleted successfully');
    } catch (error) {
      toast.error('Failed to delete property');
      console.error('Error deleting property:', error);
    }
  };

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
            <Link
              href={`/properties/${property._id}/edit`}
              className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
            >
              Edit
            </Link>
            <button
              className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
              type="button"
              onClick={() => handleDeleteProperty(property._id)}
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

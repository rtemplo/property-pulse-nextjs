'use server';

import connectDB from '@/config/database';
import Property, { SerializableProperty } from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function updateProperty(propertyId: string, formData: FormData) {
  await connectDB('updateProperty');

  const sessionUser = await getSessionUser();
  if (!sessionUser?.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error('Update failed: Property not found');
  }

  if (property.owner.toString() !== userId) {
    throw new Error('You are not authorized to update this property.');
  }

  const amenities = formData
    .getAll('amenities')
    .filter((item) => item !== '')
    .map((item) => item.toString());

  const propertyData: Partial<SerializableProperty> = {
    owner: userId,
    type: formData.get('type') as string,
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    location: {
      street: formData.get('location.street') as string,
      city: formData.get('location.city') as string,
      state: formData.get('location.state') as string,
      zipcode: formData.get('location.zipcode') as string
    },
    beds: Number(formData.get('beds')),
    baths: Number(formData.get('baths')),
    square_feet: Number(formData.get('square_feet')),
    amenities,
    rates: {
      weekly: formData.get('rates.weekly') ? Number(formData.get('rates.weekly')) : undefined,
      monthly: formData.get('rates.monthly') ? Number(formData.get('rates.monthly')) : undefined,
      nightly: formData.get('rates.nightly') ? Number(formData.get('rates.nightly')) : undefined
    },
    seller_info: {
      name: formData.get('seller_info.name') as string,
      email: formData.get('seller_info.email') as string,
      phone: formData.get('seller_info.phone') as string
    }
  };

  const updatedProperty = await Property.findByIdAndUpdate(propertyId, propertyData);

  revalidatePath('/', 'layout');

  redirect(`/properties/${updatedProperty?._id.toString()}`);
}

export default updateProperty;

'use server';

import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function addProperty(formData: FormData) {
  const amenities = formData.getAll('amenities').filter((item) => item !== '');
  const images = (
    formData
      .getAll('images')
      .filter((image) => image instanceof File && image.name !== '') as File[]
  ).map((image) => image.name);

  const propertyData = {
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
    amenities: formData.getAll('amenities') as string[],
    rates: {
      weekly: formData.get('rates.weekly') ? Number(formData.get('rates.weekly')) : undefined,
      monthly: formData.get('rates.monthly') ? Number(formData.get('rates.monthly')) : undefined,
      nightly: formData.get('rates.nightly') ? Number(formData.get('rates.nightly')) : undefined
    },
    seller_info: {
      name: formData.get('seller_info.name') as string,
      email: formData.get('seller_info.email') as string,
      phone: formData.get('seller_info.phone') as string
    },
    images: formData
      .getAll('images')
      .filter((file): file is File => file instanceof File && file.name !== '') as File[]
  };

  console.log('Property added:', propertyData);
}

export default addProperty;

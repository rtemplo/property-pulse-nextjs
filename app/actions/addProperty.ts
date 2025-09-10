'use server';

import connectDB from '@/config/database';
import Property, { SerializableProperty } from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import cloudinary from '@/config/cloudinary';

async function addProperty(formData: FormData) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser?.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  const amenities = formData
    .getAll('amenities')
    .filter((item) => item !== '')
    .map((item) => item.toString());

  const images = formData
    .getAll('images')
    .filter((image) => image instanceof File && image.name !== '') as File[];

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

  const imageUrls: string[] = [];

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);
    const imageBase64 = imageData.toString('base64');

    // Make request to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:${imageFile.type};base64,${imageBase64}`,
      { folder: 'property-pulse' }
    );

    imageUrls.push(result.secure_url);
  }

  propertyData.images = imageUrls;

  const newProperty = new Property(propertyData);
  await newProperty.save();
  revalidatePath('/', 'layout');
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;

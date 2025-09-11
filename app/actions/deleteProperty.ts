'use server';
import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function deleteProperty(propertyId: string) {
  const sessionUser = await getSessionUser();

  if (!sessionUser?.userId) {
    throw new Error('You must be logged in to delete a property.');
  }

  const { userId } = sessionUser;
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error('Property not found.');
  }

  if (property.owner.toString() !== userId) {
    throw new Error('You are not authorized to delete this property.');
  }

  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split('/');
    return parts.at(-1)?.split('.')[0];
  });

  publicIds.forEach(async (publicId) => {
    if (publicId) {
      await cloudinary.uploader.destroy('property-pulse/' + publicId);
    }
  });

  await property.deleteOne();

  revalidatePath('/', 'layout');
}

export default deleteProperty;

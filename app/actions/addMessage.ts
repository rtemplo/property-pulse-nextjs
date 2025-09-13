'use server';

import connectDB from '@/config/database';
import Message, { SerializableMessage } from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function addMessage(formData: FormData) {
  await connectDB('addMessage');

  const sessionUser = await getSessionUser();
  if (!sessionUser?.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;
  const recipient = formData.get('recipient') as string;

  if (recipient === userId) {
    throw new Error('You cannot send a message to yourself');
  }

  const messageData: Partial<SerializableMessage> = {
    sender: userId,
    recipient,
    property: formData.get('property') as string,
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    body: formData.get('body') as string
  };

  const newMessage = new Message(messageData);
  await newMessage.save();
  revalidatePath('/', 'layout');
}

export default addMessage;

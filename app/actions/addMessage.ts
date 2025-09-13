'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function addMessage(previousState: unknown, formData: FormData) {
  let submittedStatus = false;
  let errorMessage = null;

  await connectDB('addMessage');

  const sessionUser = await getSessionUser();
  if (!sessionUser?.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;
  const recipient = formData.get('recipient') as string;

  if (recipient === userId) {
    errorMessage = 'You cannot send a message to yourself';
  }

  const messageData = {
    sender: userId,
    recipient,
    property: formData.get('property') as string,
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    body: formData.get('body') as string
  };

  console.log('Message Data:', messageData);

  const newMessage = new Message(messageData);
  await newMessage.save();
  revalidatePath('/', 'layout');
  submittedStatus = true;
  return { error: errorMessage, submitted: submittedStatus };
}

export default addMessage;

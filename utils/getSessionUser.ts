import { getServerSession } from 'next-auth/next';
import { authOptions } from './authOptions';

export const getSessionUser = async () => {
  // try {
  const session = await getServerSession(authOptions);

  return {
    user: session?.user,
    userId: session?.user?.id
  };
};

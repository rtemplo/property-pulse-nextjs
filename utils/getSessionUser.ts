import { getServerSession } from 'next-auth/next';
import { authOptions } from './authOptions';
import { isIPropertyPulseSession } from './typeGuards';

export const getSessionUser = async () => {
  // try {
  const session = await getServerSession(authOptions);

  // Validate that the session matches our expected type
  if (isIPropertyPulseSession(session) && session?.user?.id) {
    return {
      user: session?.user,
      userId: session?.user?.id
    };
  } else {
    return null;
  }
  // } catch (error) {
  //   console.error('Error fetching session user:', error);
  //   return null;
  // }
};

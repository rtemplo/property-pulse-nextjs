import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/config/database';
import User from '@/models/User';
import type { NextAuthOptions, Session } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  callbacks: {
    // Invoked on successful sign on
    async signIn({ profile }) {
      try {
        if (!profile?.email || profile.email.trim() === '') {
          throw new Error('No email found in user profile');
        }

        if (!profile.name || profile.name.trim() === '') {
          throw new Error('No name found in user profile');
        }

        // 1. Connect to the database
        await connectDB('NextAuth signIn');

        // 2. Check if the user exists
        const user = await User.findOne({ email: profile?.email });

        // 3. If not, create a new user
        if (!user) {
          // Generate a unique username by combining name and email
          const baseUsername = profile!.name!.slice(0, 20) || 'user';
          let username = baseUsername;
          let counter = 1;

          // Check if username already exists and append counter if needed
          while (await User.findOne({ username })) {
            username = `${baseUsername}${counter}`;
            counter++;
          }

          const newUser = {
            email: profile!.email,
            username: username,
            image: profile?.image
          };

          await User.create(newUser);
        }

        // 4. Return true to indicate successful sign in
        return true;
      } catch (error) {
        console.error('Error during sign in:', error);
        return false;
      }
    },
    // Session callback function that modifies the session object
    async session({ session }) {
      // 1. Get user from database
      try {
        await connectDB('NextAuth get server session');
        const user = await User.findOne({ email: session.user?.email });

        // 2. Return the session with the user id embedded
        if (!user?.id) {
          throw new Error('No user id found');
        }

        const appSession: Session = {
          ...session,
          user: {
            ...session.user,
            id: user?._id?.toString() // Convert ObjectId to string
          }
        };

        return appSession;
      } catch (error) {
        console.error('Error fetching user:', error);
        return session;
      }
    }
  }
};

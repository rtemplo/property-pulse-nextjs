import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from '@/context/GlobalContext';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/styles/globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Property Pulse',
  keywords: ['real estate', 'property news', 'market trends'],
  description: 'Stay updated with the latest trends and insights in the real estate market.'
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html lang="en">
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer autoClose={3000} />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default RootLayout;

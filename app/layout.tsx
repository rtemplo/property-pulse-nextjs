import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;

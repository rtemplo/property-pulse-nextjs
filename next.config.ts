import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**'
      }
    ]
  },
  experimental: {
    reactCompiler: true,
    serverActions: {
      bodySizeLimit: '5mb'
    }
  }
};

export default nextConfig;

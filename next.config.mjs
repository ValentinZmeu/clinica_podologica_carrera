/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'podologiacarrera.com',
      },
    ],
  },
  experimental: {
    // Optimize package imports for better tree-shaking
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    // Inline critical CSS to avoid render-blocking
    optimizeCss: true,
  },
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;

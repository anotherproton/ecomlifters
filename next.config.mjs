/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['swiper'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Fix for the module not found error
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  // Optimize build output
  optimizeFonts: true,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  // Handle static files properly
  images: {
    domains: ['localhost', 'mediumpurple-fish-201640.hostingersite.com'],
    unoptimized: true,
  },
  // Add CORS headers
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
};

export default nextConfig;

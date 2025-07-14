/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['swiper'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: false, // Disable native SWC to avoid SIGBUS
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
}

module.exports = nextConfig


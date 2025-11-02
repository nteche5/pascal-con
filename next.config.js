/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // Disable native SWC to avoid SIGBUS
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
}

module.exports = nextConfig


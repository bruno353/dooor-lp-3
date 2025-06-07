/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir option is no longer needed in Next.js 14
  },
  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig 
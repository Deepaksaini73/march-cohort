/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        pathname: '/maps/api/place/photo**',
      },
    ],
    domains: [
      'maps.googleapis.com',
      'images.unsplash.com'
    ],
  },
}

module.exports = nextConfig 
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['res.cloudinary.com', 'localhost'],
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Portfolio-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Portfolio-website' : '',
}

module.exports = nextConfig
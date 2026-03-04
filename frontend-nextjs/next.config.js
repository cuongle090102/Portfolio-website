/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['res.cloudinary.com', 'localhost'],
    unoptimized: true,
  },
  basePath: process.env.GITHUB_PAGES === 'true' ? '/Portfolio-website' : '',
  assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/Portfolio-website' : '',
  // Force cache invalidation for DemoBanner removal
}

module.exports = nextConfig
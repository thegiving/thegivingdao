/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
  },
  images: {
    domains: ["images.unsplash.com", "ipfs.io"],
  },
}

module.exports = nextConfig

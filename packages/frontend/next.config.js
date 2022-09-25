/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
  },
  functions: {
    "api/ipfs-data.js": {
        includeFiles: "uploads/**"
    }
  }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "paycentral.nyc3.digitaloceanspaces.com",
      },
    ],
  },
};

module.exports = nextConfig;

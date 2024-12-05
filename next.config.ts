/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
    staticPageGenerationTimeout: 1000,

  },
};

module.exports = nextConfig;
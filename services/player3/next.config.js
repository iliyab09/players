/** @type {import('next').NextConfig} */
const nextConfig = {
  // standalone = tiny runtime image, only server.js and what it needs
  output: 'standalone',
  poweredByHeader: false,
};

module.exports = nextConfig;

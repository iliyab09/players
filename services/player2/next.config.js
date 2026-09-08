/** @type {import('next').NextConfig} */
const nextConfig = {
  // standalone = tiny runtime image, just server.js + what it needs
  output: 'standalone',
  poweredByHeader: false,
};

module.exports = nextConfig;

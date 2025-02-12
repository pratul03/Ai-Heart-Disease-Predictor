/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Add Cloudinary domain here
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude problematic dependencies from being processed by Webpack
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "node-pre-gyp": false,
      };
    }
    return config;
  },
};

export default nextConfig;

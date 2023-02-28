/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PROJECT_ID: process.env.PROJECT_ID,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    DATASET_SECRET: process.env.DATASET_SECRET,
  },
};

module.exports = nextConfig;

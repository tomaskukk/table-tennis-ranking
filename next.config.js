/** @type {import('next').NextConfig} */
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    styledComponents: true,
  },
  ...nextEnv(),
};

module.exports = nextConfig;

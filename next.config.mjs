// Importing client env variables here ensures they are validated at build time
import "./src/env.client.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

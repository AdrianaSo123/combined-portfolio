/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Phone / LAN preview hits this host. Without it, Next blocks the JS that
  // runs the CRT boot animation and chat.
  allowedDevOrigins: ["192.168.1.183"],
};

export default nextConfig;

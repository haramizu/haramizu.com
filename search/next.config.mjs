/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "doc.haramizu.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

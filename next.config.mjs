/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    domains:[
      "cdn-icons-png.flaticon.com",
      "png.pngtree.com",
      "acourseoflove.org"
    ]
  },
};

export default nextConfig;

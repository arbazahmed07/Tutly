/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

const nextConfig = withPWA({
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
      {
        protocol: "https",
        hostname: "mkbso1vsjf6fwnka.public.blob.vercel-storage.com",
        port: "",
      },
    ],
    domains: [
      "cdn-icons-png.flaticon.com",
      "png.pngtree.com",
      "i.postimg.cc",
      "acourseoflove.org",
      "img.freepik.com",
      "www.google.com",
      "images.unsplash.com",
      "images.pexels.com",
      "plus.unsplash.com",
    ],
  },
}); 

export default nextConfig;

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
      "i.postimg.cc",
      "acourseoflove.org",
      "img.freepik.com",
      "www.google.com",
      "images.unsplash.com",
      "images.pexels.com",
      "plus.unsplash.com"
    ]
  },
};

export default nextConfig;

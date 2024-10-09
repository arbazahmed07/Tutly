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
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
});

export default nextConfig;

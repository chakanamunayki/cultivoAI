/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix Turbopack workspace root detection on Windows
  // process.cwd() matches shell casing exactly; __dirname can differ on case-insensitive FS
  turbopack: {
    root: process.cwd(),
  },

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  compress: true,

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-avatar",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-label",
      "@radix-ui/react-slot",
    ],
  },

  async headers() {
    const isDev = process.env.NODE_ENV === "development";

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=()" },
          ...(isDev
            ? [
                { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, proxy-revalidate" },
                { key: "Pragma", value: "no-cache" },
                { key: "Expires", value: "0" },
              ]
            : []),
        ],
      },
      ...(isDev
        ? []
        : [
            {
              source: "/_next/static/(.*)",
              headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
            },
            {
              source: "/_next/image(.*)",
              headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
            },
            {
              source: "/fonts/(.*)",
              headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
            },
          ]),
    ];
  },
};

module.exports = nextConfig;

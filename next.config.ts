import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2400, 3000],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  // Die Vercel-Adresse auf die eigene Domain umleiten, damit Google nur eine Adresse kennt
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "piazza-meilenstein.vercel.app" }],
        destination: "https://www.piazza-meilenstein.ch/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

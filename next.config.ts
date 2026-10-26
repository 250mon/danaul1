import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Naver Maps loads its script, tiles and API calls from these hosts.
const naverHosts = [
  "https://oapi.map.naver.com",
  "https://*.map.naver.com",
  "https://*.pstatic.net",
  "https://*.naver.com",
  "https://*.naver.net",
  // The Maps SDK posts its own error telemetry here; blocking it fills the
  // console with CSP violations that mask real map failures.
  "https://*.navercorp.com",
].join(" ");

// Google Analytics: the tag itself, and the endpoints gtag.js beacons to.
const gtagHost = "https://www.googletagmanager.com";
const gaCollectHosts = [
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://*.g.doubleclick.net",
].join(" ");

// Next.js injects inline bootstrap/hydration scripts, so script-src needs
// 'unsafe-inline' until the app moves to nonce-based CSP.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ""}${naverHosts} ${gtagHost}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${naverHosts} ${gtagHost} ${gaCollectHosts}`,
  "font-src 'self' data:",
  "media-src 'self'",
  "worker-src 'self' blob:",
  `connect-src 'self' ${naverHosts} ${gtagHost} ${gaCollectHosts}${isDev ? " ws: wss:" : ""}`,
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Source photos are up to 6MB PNGs; cache the optimized variants hard.
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/api/admin/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
      {
        // Static media is content-addressed by filename in practice; without
        // this it revalidates on every visit.
        source: "/:dir(danaul|backgrounds|clips|fonts|favicons|og)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
  async redirects() {
    return [
      // The home page now lives at "/"; keep the old path working.
      { source: "/danaul", destination: "/", permanent: true },
      // The trauma clinic was renamed to 외과 (surgery); keep the indexed path working.
      { source: "/trauma", destination: "/surgery", permanent: true },
    ];
  },
};

export default nextConfig;

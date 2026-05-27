import type { NextConfig } from "next";

// next/font/google downloads fonts at build time and self-hosts them under
// /_next/static/, so no external font CDN is needed in the CSP.
const csp = [
  "default-src 'self'",
  // Next.js inlines critical bootstrap scripts; unsafe-inline is required.
  // unsafe-eval is needed only in dev (HMR); kept here so the same config
  // works in both modes without a separate dev override.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: blob:",
  // audio_url values in listening_clips may point to any HTTPS host (CDN,
  // Supabase Storage, etc.), so allow all HTTPS media sources.
  "media-src 'self' https:",
  // Supabase JS client opens REST + Realtime (WSS) connections.
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy",   value: csp },
  { key: "X-Frame-Options",           value: "DENY" },
  { key: "X-Content-Type-Options",    value: "nosniff" },
  { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // 2-year HSTS; Vercel always terminates TLS so this is safe to preload.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control",    value: "on" },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework in response headers.
  poweredByHeader: false,

  images: {
    remotePatterns: [],
  },

  async headers() {
    return [
      {
        // Apply to every route, including API routes and _next/static assets.
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

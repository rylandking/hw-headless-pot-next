import BuilderDevTools from "@builder.io/dev-tools/next";

/** @type {import('next').NextConfig} */
const nextConfig = BuilderDevTools()({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/proxy/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*", // Apply headers to API routes
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "", // Adjust the origin as needed
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type",
          },
        ],
      },
    ];
  },
});

export default nextConfig;

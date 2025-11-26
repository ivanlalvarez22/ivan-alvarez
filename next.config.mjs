/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-accordion",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-dropdown-menu",
    ],
    // Next.js 16 optimizations
    optimizeCss: true,
  },
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // Turbopack config for Next.js 16 (empty to allow webpack config)
  turbopack: {},
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.hackviser.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "app.kajabi.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "kajabi-storefronts-production.kajabi-cdn.com",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimize chunk splitting for better caching and smaller bundles
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        minimize: true,
        splitChunks: {
          chunks: "all",
          minSize: 20000,
          maxSize: 200000,
          cacheGroups: {
            default: false,
            vendors: false,
            // React and React DOM in separate chunk
            react: {
              name: "react",
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              chunks: "all",
              priority: 40,
              enforce: true,
            },
            // Next.js framework
            framework: {
              name: "framework",
              test: /[\\/]node_modules[\\/](next)[\\/]/,
              chunks: "all",
              priority: 35,
              enforce: true,
            },
            // Separate chunk for lucide-react
            lucide: {
              name: "lucide",
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              chunks: "async",
              priority: 30,
              enforce: true,
            },
            // Separate chunk for radix-ui
            radix: {
              name: "radix",
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              chunks: "async",
              priority: 25,
              enforce: true,
            },
            // Other vendor libraries
            vendor: {
              name: "vendor",
              test: /[\\/]node_modules[\\/]/,
              chunks: "async",
              priority: 20,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            // Common chunk for shared code
            common: {
              name: "common",
              minChunks: 2,
              chunks: "all",
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Optimize CSS caching
        source: "/_next/static/css/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
}

export default nextConfig

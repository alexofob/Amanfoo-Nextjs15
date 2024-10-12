/** @type {import("next").NextConfig} */

const nextConfig = {
  experimental: {
    ppr: true,
    reactCompiler: true,
    typedRoutes: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/research/synthetic-membrane/paper",
        destination: "/research/synthetic-membrane",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // early preview URL for the guide
        source: "/guides/k8s-local-llm",
        destination: "/blog/k8s-local-llm",
        permanent: false,
      },
      {
        source: "/research/synthetic-membrane/paper",
        destination: "/research/0001-synthetic-membrane-coordination-layer",
        permanent: true,
      },
      {
        // v1 paper withdrawn — superseded by v2.1
        source: "/research/synthetic-membrane",
        destination: "/research/0001-synthetic-membrane-coordination-layer",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

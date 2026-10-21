import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // The v2 site is static HTML in public/v2. beforeFiles lets it take over
      // the home, research index and CV paths from the old app routes.
      beforeFiles: [
        { source: "/", destination: "/v2/index.html" },
        { source: "/research", destination: "/v2/research/index.html" },
        { source: "/cv", destination: "/v2/cv/index.html" },
        { source: "/v2", destination: "/v2/index.html" },
        { source: "/v2/research", destination: "/v2/research/index.html" },
        { source: "/v2/cv", destination: "/v2/cv/index.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
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

import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withContentlayer(config)

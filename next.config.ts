import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // ПРАВИЛЬНО: Применяется ко всем изображениям в проекте
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ftp.goit.study",
        port: "",
        pathname: "/img/campers-test-task/**",
      },
    ],
  },
};

export default nextConfig;

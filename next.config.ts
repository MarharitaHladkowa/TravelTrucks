import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ftp.goit.study", // Разрешаем этот хост из ошибки
        port: "",
        pathname: "/img/campers-test-task/**",
      },
    ],
  },
};

export default nextConfig;

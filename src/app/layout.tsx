import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "../components/Header";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TravelTrucks - Camper Rental",
  description: "Rent the camper of your dreams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}

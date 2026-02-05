import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "../components/Header/Header";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "TravelTrucks — Camper Rental",
  icons: {
    icon: "/favicon.ico.png",
  },
  description:
    "Modern platform for renting campers in Ukraine. Browse our catalog and book your next adventure!",
  openGraph: {
    title: "TravelTrucks — Adventure Awaits",
    description: "Rent the best motorhomes and campers easily.",
    url: "https://github.com/MarharitaHladkowa/travel-trucks",
    siteName: "TravelTrucks",
    images: [
      {
        // Ссылка на сжатую картинку, которую ты запушишь на GitHub
        url: "https://github.com/MarharitaHladkowa/travel-trucks/blob/main/public/travel-trucks-preview.jpg?raw=true",
        width: 1200,
        height: 630,
        alt: "TravelTrucks Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

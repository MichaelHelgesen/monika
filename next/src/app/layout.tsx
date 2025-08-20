import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SnipcartProvider from "@/components/SnipCartProvider"
import { MainMenu } from "@/components/MainMenu"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kunstbutikk",
  description: "Kunstners nettbutikk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
    <head>
    </head>
<body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
            <SnipcartProvider />
      </body>
    </html>
  );
}

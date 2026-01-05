import type { Metadata } from "next";
import { Inter, Great_Vibes, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import SnipcartProvider from "@/components/SnipCartProvider"
//import { MainMenu } from "@/components/MainMenu"
//import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HeaderWrapper from '@/components/HeaderWrapper';

export const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // gjør den tilgjengelig som CSS-var
  display: "swap"
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-poppins", // gjør den tilgjengelig som CSS-var
  display: "swap"
});

export const montserrat = Montserrat({ subsets: ['latin'], weight: '500', display: "swap" });

const metadata: Metadata = {
  title: "Monika Bettum - Kunst",
  description: "Utforsk Monika Bettums kunstverker",
};

export default function RootLayout({children}:{
  children: React.ReactNode}) 
{
  return (
    <html lang="no" className={`${inter.variable}`}>
<body className="min-h-screen flex flex-col">
            <SnipcartProvider />
        <HeaderWrapper />
        <main className="flex-1">{children}</main>
            <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Great_Vibes, Montserrat, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import SnipcartProvider from "@/components/SnipCartProvider"
import { MainMenu } from "@/components/MainMenu"
//import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HeaderWrapper from '@/components/HeaderWrapper';

export const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // gjør den tilgjengelig som CSS-var
});
export const montserrat = Montserrat({ subsets: ['latin'], weight: '500' });

const metadata: Metadata = {
  title: "Kunstbutikk",
  description: "Kunstners nettbutikk",
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

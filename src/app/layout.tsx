import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "The Crypto Masters | Helping You Master Crypto",
    template: "%s | The Crypto Masters",
  },
  description:
    "The Crypto Masters are helping you master an understanding of crypto assets through our podcast, tools, and educational content.",
  openGraph: {
    type: "website",
    siteName: "The Crypto Masters",
    title: "The Crypto Masters",
    description: "Helping You Master an Understanding of Crypto Assets",
  },
  twitter: {
    card: "summary_large_image",
    site: "@theCryptoMS1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crypto Prices",
  description: "Live cryptocurrency prices, market data, and charts. Track the top 100 coins by market cap.",
  openGraph: {
    title: "Crypto Prices | The Crypto Masters",
    description: "Live cryptocurrency prices, market data, and charts. Track the top 100 coins by market cap.",
    images: [{ url: "/images/og-card.png" }],
  },
};

export default function CryptoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

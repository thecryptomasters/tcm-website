import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Price at Market Cap",
  description: "Compare crypto market caps and see what a coin's price would be with another coin's market cap.",
  openGraph: {
    title: "Price at Market Cap | The Crypto Masters",
    description: "Compare crypto market caps and see what a coin's price would be with another coin's market cap.",
    images: [{ url: "/images/og-card.png" }],
  },
};

export default function MarketCapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

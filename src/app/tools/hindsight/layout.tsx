import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professor Hindsight",
  description: "Calculate what your crypto investment would be worth if you had bought earlier. A hindsight profit calculator.",
  openGraph: {
    title: "Professor Hindsight | The Crypto Masters",
    description: "Calculate what your crypto investment would be worth if you had bought earlier.",
    images: [{ url: "/images/og-card.png" }],
  },
};

export default function HindsightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

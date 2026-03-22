import Hero from "@/components/home/Hero";
import CryptoTicker from "@/components/home/CryptoTicker";
import LatestEpisode from "@/components/home/LatestEpisode";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import ToolsPreview from "@/components/home/ToolsPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CryptoTicker />
      <LatestEpisode />
      <ToolsPreview />
      <NewsletterSignup />
    </>
  );
}

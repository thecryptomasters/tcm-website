import type { Metadata } from "next";
import { podcastEpisodes } from "@/lib/placeholder-data";
import EpisodeCard from "@/components/podcast/EpisodeCard";

export const metadata: Metadata = {
  title: "Podcast",
  description: "Listen to The Crypto Masters podcast — crypto education, market analysis, and insights.",
  openGraph: {
    title: "Podcast | The Crypto Masters",
    description: "Listen to The Crypto Masters podcast — crypto education, market analysis, and insights.",
    images: [{ url: "/images/og-card.png" }],
  },
};

export default function PodcastPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            The Crypto Masters <span className="text-accent">Podcast</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join Brian and Ross as they break down the crypto world. Available on all major platforms.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a href="https://open.spotify.com/show/38kIh4n39NvSbUTJew7rF4?si=p5LCiy0fTKuZipgXDNpFbg" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-card border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-accent hover:text-accent transition-colors">Spotify</a>
            <a href="https://podcasts.apple.com/us/podcast/the-crypto-masters-podcast/id1507473032" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-card border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-accent hover:text-accent transition-colors">Apple Podcasts</a>
            <a href="https://www.youtube.com/channel/UCyrKtJ25wtlemNHk5MG-9tQ" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-card border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-accent hover:text-accent transition-colors">YouTube</a>
            <a href="https://thecryptomasters.podbean.com/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-card border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-accent hover:text-accent transition-colors">Podbean</a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcastEpisodes.map((episode) => (
            <EpisodeCard key={episode.slug} episode={episode} />
          ))}
        </div>
      </div>
    </div>
  );
}

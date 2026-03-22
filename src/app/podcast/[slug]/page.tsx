import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Headphones } from "lucide-react";
import { podcastEpisodes } from "@/lib/placeholder-data";

export async function generateStaticParams() {
  return podcastEpisodes.map((ep) => ({ slug: ep.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const episode = podcastEpisodes.find((e) => e.slug === slug);
  if (!episode) return { title: "Episode Not Found" };
  return { title: episode.title, description: episode.description };
}

export default async function EpisodeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const episode = podcastEpisodes.find((e) => e.slug === slug);
  if (!episode) notFound();

  const links = [
    { label: "Spotify", url: episode.spotifyUrl },
    { label: "Apple Podcasts", url: episode.appleUrl },
    { label: "YouTube", url: episode.youtubeUrl },
    { label: "Podbean", url: episode.podbeanUrl },
  ].filter((l) => l.url);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/podcast" className="inline-flex items-center gap-2 text-gray-400 hover:text-accent transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Podcast
        </Link>

        <div className="bg-card/60 backdrop-blur border border-gray-700/50 rounded-xl p-8">
          <div className="flex items-center gap-2 text-accent mb-4">
            <Headphones className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Episode</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{episode.title}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span>{new Date(episode.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {episode.duration}
            </span>
          </div>

          <p className="text-gray-300 leading-relaxed mb-8">{episode.description}</p>

          <div className="flex flex-wrap gap-3">
            {links.map(({ label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-accent text-primary-dark font-semibold rounded-lg hover:bg-accent-hover transition-colors text-sm"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

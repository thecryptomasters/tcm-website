import Link from "next/link";
import { Headphones, Clock } from "lucide-react";
import { PodcastEpisode } from "@/types";

export default function EpisodeCard({ episode }: { episode: PodcastEpisode }) {
  return (
    <Link
      href={`/podcast/${episode.slug}`}
      className="group block bg-card/60 backdrop-blur border border-gray-700/50 rounded-xl p-6 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="flex items-center gap-2 text-accent mb-3">
        <Headphones className="w-4 h-4" />
        <span className="text-xs font-semibold uppercase tracking-wider">Episode</span>
      </div>
      <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors mb-2">
        {episode.title}
      </h3>
      <p className="text-gray-400 text-sm line-clamp-2 mb-4">{episode.description}</p>
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span>{new Date(episode.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {episode.duration}
        </span>
      </div>
    </Link>
  );
}

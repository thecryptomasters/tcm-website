"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Headphones, ArrowRight } from "lucide-react";
import { podcastEpisodes } from "@/lib/placeholder-data";

export default function LatestEpisode() {
  const latest = podcastEpisodes[0];

  return (
    <section className="py-16 sm:py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card/60 backdrop-blur border border-gray-700/50 rounded-xl p-8 sm:p-10"
        >
          <div className="flex items-center gap-2 text-accent mb-4">
            <Headphones className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Latest Episode</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {latest.title}
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl">
            {latest.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/podcast/${latest.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary-dark font-semibold rounded-lg hover:bg-accent-hover transition-colors"
            >
              Listen Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/podcast"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-accent hover:text-accent transition-colors"
            >
              All Episodes
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

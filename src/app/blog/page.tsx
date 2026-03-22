import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read the latest insights and analysis from The Crypto Masters.",
};

export default function BlogPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            The <span className="text-accent">Blog</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Insights, analysis, and educational content from The Crypto Masters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-card/60 backdrop-blur border border-gray-700/50 rounded-xl p-6 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-primary/50 text-accent rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-semibold text-white group-hover:text-accent transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>{post.author}</span>
                <span>&middot;</span>
                <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

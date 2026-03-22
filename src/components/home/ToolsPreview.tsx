"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calculator, TrendingUp } from "lucide-react";

const tools = [
  {
    title: "Professor Hindsight",
    description:
      "Ever wonder what your investment would be worth if you had bought earlier? Find out with our hindsight profit calculator.",
    href: "/tools/hindsight",
    image: "/images/professor_hindsight.png",
    icon: Calculator,
  },
  {
    title: "Price at Market Cap",
    description:
      "What would a coin's price be if it had another coin's market cap? Compare any two coins to find out.",
    href: "/tools/market-cap",
    image: "/images/priceAtMarketCap.png",
    icon: TrendingUp,
  },
];

export default function ToolsPreview() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Crypto <span className="text-accent">Tools</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Explore our suite of tools designed to help you analyze and understand the crypto market.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link
                href={tool.href}
                className="group block bg-card/60 backdrop-blur border border-gray-700/50 rounded-xl p-6 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 shrink-0">
                    <Image
                      src={tool.image}
                      alt={tool.title}
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-accent transition-colors mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

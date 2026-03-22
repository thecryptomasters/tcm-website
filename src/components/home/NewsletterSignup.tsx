"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function NewsletterSignup() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-primary to-primary-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Mail className="w-12 h-12 text-accent mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Get the latest crypto insights, market analysis, and podcast updates delivered straight to your inbox. Join The Crypto Masters newsletter.
          </p>
          <a
            href="https://the-crypto-masters.beehiiv.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary-dark font-bold rounded-lg hover:bg-accent-hover transition-colors text-lg"
          >
            <Mail className="w-5 h-5" />
            Subscribe to Newsletter
          </a>
        </motion.div>
      </div>
    </section>
  );
}

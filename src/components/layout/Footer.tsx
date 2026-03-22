import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail } from "lucide-react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  { href: "https://www.facebook.com/TheCryptocurrencyMasters", icon: Facebook, label: "Facebook" },
  { href: "https://twitter.com/theCryptoMS1", icon: XIcon, label: "X (Twitter)" },
  { href: "https://www.instagram.com/the_crypto_masters/", icon: Instagram, label: "Instagram" },
  { href: "https://www.youtube.com/channel/UCyrKtJ25wtlemNHk5MG-9tQ", icon: Youtube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-accent font-bold text-lg mb-3">The Crypto Masters</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Helping you master an understanding of crypto assets through education, analysis, and community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link href="/podcast" className="text-gray-400 hover:text-accent transition-colors text-sm">Podcast</Link>
              <Link href="/blog" className="text-gray-400 hover:text-accent transition-colors text-sm">Blog</Link>
              <Link href="/crypto" className="text-gray-400 hover:text-accent transition-colors text-sm">Crypto Prices</Link>
              <Link href="/tools/hindsight" className="text-gray-400 hover:text-accent transition-colors text-sm">Professor Hindsight</Link>
              <a href="https://the-crypto-masters.beehiiv.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors text-sm">Newsletter</a>
            </div>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">Connect</h4>
            <div className="flex gap-4 mb-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <a href="mailto:thecryptomasters19@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors text-sm">
              <Mail className="w-4 h-4" />
              thecryptomasters19@gmail.com
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-gray-500 text-xs leading-relaxed">
            <strong>Disclaimer:</strong> Nothing in our podcast, website, or social media should be considered investment advice.
            We are not financial advisors. All content is for educational and entertainment purposes only.
            Always do your own research and consult with a qualified financial advisor before making any investment decisions.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} The Crypto Masters. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Target, BookOpen, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the team behind The Crypto Masters — Brian McCoy and Ross Eaton.",
};

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const team = [
  {
    name: "Brian McCoy",
    image: "/images/brian_headshot.png",
    bio: "Hey I'm Brian. I am a current practicing lawyer. I co-managed a frontier markets hedge fund for almost 20 years. So my background in investing is in equities. I have been investing in crypto currency since 2018 and am focused on bitcoin and altcoins as a long term investment.",
    email: "brian@thecryptomasters.com",
    twitter: "https://twitter.com/cryptolerable",
  },
  {
    name: "Ross Eaton",
    image: "/images/ross_headshot.png",
    bio: "Hello I'm Ross. I have a degree in Computer Science with 6 years of experience in software development and data analysis. I have been in the world of cryptocurrency since 2017. I see crypto as the tech of the future with potential of replacing traditional banking systems.",
    email: "ross@thecryptomasters.com",
    twitter: "https://twitter.com/RosstheCryptoB1",
  },
];

const values = [
  {
    icon: Target,
    title: "Our Goal",
    description: "To provide clear, honest, and accessible crypto education for everyone — from beginners to seasoned investors.",
  },
  {
    icon: BookOpen,
    title: "Our Focus",
    description: "Breaking down complex cryptocurrency topics into digestible content through our podcast, blog, and interactive tools.",
  },
  {
    icon: Users,
    title: "Helping You",
    description: "Empowering you with the knowledge and tools to make informed decisions in the crypto space. We are here to help, not to give financial advice.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About <span className="text-accent">The Crypto Masters</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Two crypto enthusiasts with complementary backgrounds, helping you navigate the world of digital assets.
          </p>
        </div>

        {/* Team */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-card/60 backdrop-blur border border-gray-700/50 rounded-xl p-8 text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full border-2 border-accent/50"
                />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{member.name}</h2>
              <p className="text-gray-400 leading-relaxed mb-6">{member.bio}</p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent transition-colors"
                  aria-label={`${member.name} on X`}
                >
                  <XIcon className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="text-gray-400 hover:text-accent transition-colors"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-card/60 backdrop-blur border border-gray-700/50 rounded-xl p-8 text-center"
            >
              <value.icon className="w-10 h-10 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

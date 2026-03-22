import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20">
      <div className="text-center px-4">
        <Image
          src="/images/tcmLogo_capNoBg.png"
          alt="The Crypto Masters"
          width={80}
          height={80}
          className="mx-auto mb-6 opacity-50"
        />
        <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Looks like this page went to the moon without us. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="px-8 py-3 bg-accent text-primary-dark font-semibold rounded-lg hover:bg-accent-hover transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

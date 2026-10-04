'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 bg-gray-950 text-white">
      {/* 404 Big Number */}
      <h1 className="text-[8rem] sm:text-[10rem] font-black text-gray-800 leading-none select-none">
        404
      </h1>

      {/* Message */}
      <div className="text-center -mt-8 sm:-mt-12 space-y-4 max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400">
          Page Not Found
        </h2>
        <p className="text-gray-400 text-base sm:text-lg">
          The page <code className="bg-gray-800 px-2 py-1 rounded text-yellow-300 text-sm">{pathname}</code> doesn&apos;t exist or has been moved.
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-8 py-3 bg-lime-400 hover:bg-lime-300 text-black font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-lime-400/20"
        >
          ← Back to Home
        </Link>
        <Link
          href="/workouts"
          className="px-8 py-3 border border-gray-700 hover:border-yellow-400 text-gray-300 hover:text-yellow-400 font-bold rounded-full transition-all duration-300"
        >
          Browse Workouts
        </Link>
      </div>

      {/* Quick Tip */}
      <p className="mt-12 text-gray-500 text-sm text-center">
        If you think this is an error, go back and try again.
      </p>
    </main>
  );
}
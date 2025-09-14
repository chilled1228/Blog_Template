'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/layout';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Add noindex meta tag dynamically
    const metaTag = document.createElement('meta');
    metaTag.name = 'robots';
    metaTag.content = 'noindex, nofollow';
    document.head.appendChild(metaTag);

    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="max-w-md w-full mx-auto text-center px-4">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-stone-900 mb-4">500</h1>
            <h2 className="text-2xl font-semibold text-stone-700 mb-2">Something went wrong</h2>
            <p className="text-stone-600 mb-4">
              We apologize for the inconvenience. Our team has been notified of this issue.
            </p>
            <p className="text-sm text-stone-500">
              Error ID: {error.digest}
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={reset}
              className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Try again
            </button>
            
            <div className="text-center">
              <Link 
                href="/"
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { Home, Search } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
  title: 'Page Not Found - behindthebrain',
  description: 'The page you are looking for could not be found. Return to our homepage or browse our articles.',
};

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="max-w-md w-full mx-auto text-center px-4">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-stone-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-stone-700 mb-2">Page not found</h2>
            <p className="text-stone-600 mb-6">
              The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
              >
                <Home className="h-5 w-5" />
                Back to Home
              </Link>
              
              <Link 
                href="/blog"
                className="inline-flex items-center justify-center gap-2 border-2 border-teal-600 text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-teal-50 transition-colors"
              >
                <Search className="h-5 w-5" />
                Browse Articles
              </Link>
            </div>
            
            <div className="text-sm text-stone-500">
              <p>Looking for something specific? Try our:</p>
              <div className="flex justify-center gap-4 mt-2">
                <Link href="/archive" className="text-teal-600 hover:text-teal-700">Archive</Link>
                <span className="text-stone-400">•</span>
                <Link href="/category" className="text-teal-600 hover:text-teal-700">Categories</Link>
                <span className="text-stone-400">•</span>
                <Link href="/contact" className="text-teal-600 hover:text-teal-700">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
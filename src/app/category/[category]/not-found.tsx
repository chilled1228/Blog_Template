import Link from 'next/link';
import { Layout } from '@/components/layout';

export default function CategoryNotFound() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Category Not Found</h2>
            <p className="text-gray-600">
              The category you&apos;re looking for doesn&apos;t exist or may have been removed.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link 
              href="/blog"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Browse All Posts
            </Link>
            
            <div className="text-center">
              <Link 
                href="/"
                className="text-blue-600 hover:text-blue-700 font-medium"
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
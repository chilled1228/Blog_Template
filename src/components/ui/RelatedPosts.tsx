'use client';

import React, { useEffect, useState } from 'react';
import { BlogPost, getRelatedPosts } from '@/lib/blogService';
import BlogPostCard from './BlogPostCard';

interface RelatedPostsProps {
  currentPostSlug: string;
  category: string;
  limit?: number;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ 
  currentPostSlug, 
  category, 
  limit = 4 
}) => {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        setLoading(true);
        const posts = await getRelatedPosts(currentPostSlug, category, limit);
        setRelatedPosts(posts);
      } catch (error) {
        console.error('Error loading related posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [currentPostSlug, category, limit]);

  if (loading) {
    return (
      <section className="related-posts-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--black-olive)' }}>Related Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="rounded-2xl overflow-hidden h-full flex flex-col animate-pulse" style={{ background: 'linear-gradient(135deg, #fef9f8 0%, #f9f3f2 50%, #f4edec 100%)', border: '1px solid #3d8a8e' }}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl m-2 sm:m-3 bg-gray-200"></div>
                <div className="p-4 sm:p-5 flex-grow flex flex-col">
                  <div className="mb-3">
                    <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="mb-3 flex-grow">
                    <div className="w-full h-5 bg-gray-200 rounded mb-2"></div>
                    <div className="w-4/5 h-5 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center gap-2 mt-auto">
                    <div className="w-8 h-4 bg-gray-200 rounded"></div>
                    <div className="w-20 h-4 bg-gray-200 rounded"></div>
                    <div className="w-2 h-4 bg-gray-200 rounded"></div>
                    <div className="w-16 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="related-posts-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--black-olive)' }}>Related Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {relatedPosts.map((post) => (
            <BlogPostCard key={post.id || post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
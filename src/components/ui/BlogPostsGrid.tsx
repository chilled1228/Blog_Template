'use client';

import React, { useEffect, useState } from 'react';
import BlogPostCard from './BlogPostCard';
import BlogPostCardSkeleton from './BlogPostCardSkeleton';
import { BlogPost, getBlogPosts } from '@/lib/blogService';

interface BlogPostsGridProps {
  posts?: BlogPost[];
}

const BlogPostsGrid: React.FC<BlogPostsGridProps> = ({ posts: propPosts }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        // If posts are provided as props, use them, otherwise fetch all posts
        const posts = propPosts || await getBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [propPosts]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <BlogPostCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {blogPosts.map((post) => (
          <BlogPostCard 
            key={post.id} 
            post={post} 
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPostsGrid;
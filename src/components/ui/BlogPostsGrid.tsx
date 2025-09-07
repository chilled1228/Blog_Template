'use client';

import React, { useEffect, useState } from 'react';
import BlogPostCard from './BlogPostCard';
import BlogPostCardSkeleton from './BlogPostCardSkeleton';
import { BlogPost, getBlogPosts } from '@/lib/blogService';

const BlogPostsGrid: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const posts = await getBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <div className="posts-grid-row">
        <div className="posts-grid">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <BlogPostCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="posts-grid-row">
      <div className="posts-grid">
        {blogPosts.map((post, index) => (
          <BlogPostCard 
            key={post.id} 
            post={post} 
            data-index={index}
            data-column={index % 3 === 1 ? 'second-column' : index % 3 === 2 ? 'third-column' : 'first-column'}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPostsGrid;
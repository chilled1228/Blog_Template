'use client';

import React, { useEffect, useState } from 'react';
import BlogPostCard from './BlogPostCard';
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
    return <div className="posts-grid-row">Loading blog posts...</div>;
  }

  return (
    <div className="posts-grid-row">
      <div className="posts-grid">
        {blogPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPostsGrid;
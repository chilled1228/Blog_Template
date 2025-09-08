import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blogService';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  // Use the slug for better SEO instead of the ID
  const postUrl = `/${post.slug}`;

  return (
    <article className="blog-post-card" data-post-id={post.id}>
      <div className="blog-post-image-container">
        <Link href={postUrl} className="blog-post-image-link">
          <Image 
            src={post.image} 
            alt={post.title} 
            className="blog-post-image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </div>
      
      <div className="blog-post-content">
        <div>
          <Link 
            href={post.category_url} 
            className="blog-post-category-link"
          >
            {post.category}
          </Link>
        </div>
        
        <h2 className="blog-post-title">
          <Link 
            href={postUrl}
            className="blog-post-title-link"
          >
            {post.title}
          </Link>
        </h2>
        
        <div className="blog-post-meta">
          <span>By</span>
          <Link 
            href={post.author_url} 
            className="blog-post-author"
          >
            {post.author}
          </Link>
          <span className="blog-post-date">•</span>
          <time dateTime={post.datetime} className="blog-post-date-time">
            {post.date}
          </time>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
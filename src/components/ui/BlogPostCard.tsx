import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: number;
  title: string;
  url: string;
  category: string;
  categoryUrl: string;
  author: string;
  authorUrl: string;
  date: string;
  datetime: string;
  image: string;
}

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <article className="blog-post-card">
      <Link href={post.url} className="blog-post-card-link">
        <div className="blog-post-image-container">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill
            className="blog-post-image"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>
      
      <div className="blog-post-content">
        <div>
          <Link 
            href={post.categoryUrl} 
            className="blog-post-category-link"
          >
            {post.category}
          </Link>
        </div>
        
        <h2 className="blog-post-title">
          <Link 
            href={post.url}
            className="blog-post-title-link"
          >
            {post.title}
          </Link>
        </h2>
        
        <div className="blog-post-meta">
          <span>By</span>
          <Link 
            href={post.authorUrl} 
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
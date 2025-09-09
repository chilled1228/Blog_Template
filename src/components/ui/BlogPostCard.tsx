import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blogService';
import { typography, textColors, textSpacing } from '@/lib/typography';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  // Use the slug for better SEO instead of the ID
  const postUrl = `/${post.slug}`;

  return (
    <article 
      className="rounded-2xl overflow-hidden h-full flex flex-col group"
      style={{ 
        background: 'linear-gradient(135deg, #fef9f8 0%, #f9f3f2 50%, #f4edec 100%)',
        border: '1px solid #3d8a8e'
      }}
      data-post-id={post.id}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl m-2 sm:m-3">
        <Link 
          href={postUrl} 
          className="block h-full w-full"
        >
          <Image 
            src={post.image} 
            alt={post.title} 
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 rounded-lg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </div>
      
      <div className="p-4 sm:p-5 flex-grow flex flex-col">
        <div className={textSpacing.tight}>
          <Link 
            href={post.category_url} 
            className={`${typography.badge} inline-block px-3 py-1 rounded-full transition-colors duration-200`}
            style={{ backgroundColor: 'rgba(76, 164, 168, 0.1)', color: '#4CA4A8' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(76, 164, 168, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(76, 164, 168, 0.1)'}
          >
            {post.category}
          </Link>
        </div>
        
        <h1 className={`${typography.title} ${textSpacing.title} flex-grow`} style={{ color: '#44403D' }}>
          <Link 
            href={postUrl}
            className={`${typography.link} transition-colors duration-200`}
            style={{ color: 'inherit' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#4CA4A8'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#44403D'}
          >
            {post.title}
          </Link>
        </h1>
        
        <div className={`flex items-center ${typography.meta} mt-auto`}>
          <span className="mr-1">By</span>
          <Link 
            href={post.author_url} 
            className={`${typography.link} mr-2`}
            style={{ color: '#4B5D58' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#4CA4A8'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#4B5D58'}
          >
            {post.author}
          </Link>
          <span className="text-gray-300 mr-2">•</span>
          <time dateTime={post.datetime} className={textColors.muted}>
            {post.date}
          </time>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
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
    <article 
      className="rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col group"
      style={{ 
        background: 'linear-gradient(135deg, #fef9f8 0%, #f9f3f2 50%, #f4edec 100%)',
        border: '1px solid #3d8a8e'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#4CA4A8';
        e.currentTarget.style.background = 'linear-gradient(135deg, #fdf7f6 0%, #f7f0ef 50%, #f2eae9 100%)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(61, 138, 142, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#3d8a8e';
        e.currentTarget.style.background = 'linear-gradient(135deg, #fef9f8 0%, #f9f3f2 50%, #f4edec 100%)';
        e.currentTarget.style.boxShadow = '';
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
        <div className="mb-3">
          <Link 
            href={post.category_url} 
            className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors duration-200"
            style={{ backgroundColor: 'rgba(76, 164, 168, 0.1)', color: '#4CA4A8' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(76, 164, 168, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(76, 164, 168, 0.1)'}
          >
            {post.category}
          </Link>
        </div>
        
        <h2 className="text-base sm:text-lg font-bold mb-3 flex-grow leading-tight" style={{ color: '#44403D' }}>
          <Link 
            href={postUrl}
            className="transition-colors duration-200"
            style={{ color: 'inherit' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#4CA4A8'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#44403D'}
          >
            {post.title}
          </Link>
        </h2>
        
        <div className="flex items-center text-sm text-gray-500 mt-auto">
          <span className="mr-1">By</span>
          <Link 
            href={post.author_url} 
            className="font-medium transition-colors duration-200 mr-2"
            style={{ color: '#4B5D58' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#4CA4A8'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#4B5D58'}
          >
            {post.author}
          </Link>
          <span className="text-gray-300 mr-2">•</span>
          <time dateTime={post.datetime} className="text-gray-500">
            {post.date}
          </time>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
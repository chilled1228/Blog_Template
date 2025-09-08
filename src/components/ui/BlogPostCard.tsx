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
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col group"
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
            className="inline-block px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors duration-200"
          >
            {post.category}
          </Link>
        </div>
        
        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex-grow leading-tight">
          <Link 
            href={postUrl}
            className="hover:text-blue-600 transition-colors duration-200"
          >
            {post.title}
          </Link>
        </h2>
        
        <div className="flex items-center text-sm text-gray-500 mt-auto">
          <span className="mr-1">By</span>
          <Link 
            href={post.author_url} 
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 mr-2"
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
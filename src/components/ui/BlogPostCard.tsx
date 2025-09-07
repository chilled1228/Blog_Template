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
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 h-full">
      <Link href={post.url} className="block p-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>
      
      <div className="p-5">
        <div className="mb-2">
          <Link 
            href={post.categoryUrl} 
            className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wide rounded-full hover:bg-blue-100 transition-colors"
          >
            {post.category}
          </Link>
        </div>
        
        <h2 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
          <Link 
            href={post.url}
            className="hover:text-blue-600 transition-colors line-clamp-2"
          >
            {post.title}
          </Link>
        </h2>
        
        <div className="flex items-center text-sm text-gray-600 mt-auto">
          <span className="text-gray-500">By</span>
          <Link 
            href={post.authorUrl} 
            className="ml-1 font-medium text-gray-800 hover:text-blue-600 transition-colors"
          >
            {post.author}
          </Link>
          <span className="mx-2 text-gray-400">•</span>
          <time dateTime={post.datetime} className="text-gray-500">
            {post.date}
          </time>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
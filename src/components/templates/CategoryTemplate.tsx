import React from 'react';
import { Layout } from '@/components/layout';
import CategoryBanner from '@/components/ui/CategoryBanner';
import BlogPostsGrid from '@/components/ui/BlogPostsGrid';
import Pagination from '@/components/ui/Pagination';
import CategoryStructuredData from '@/components/ui/CategoryStructuredData';
import { BlogPost } from '@/lib/blogService';

interface CategoryTemplateProps {
  category: string;
  description: string;
  bannerImage: string;
  posts: BlogPost[];
  url: string;
}

export default function CategoryTemplate({ 
  category, 
  description, 
  bannerImage, 
  posts, 
  url 
}: CategoryTemplateProps) {
  return (
    <Layout>
      <CategoryStructuredData 
        category={category} 
        url={url}
        posts={posts}
      />
      <CategoryBanner
        title={category}
        description={description}
        image={bannerImage}
        postCount={posts.length}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogPostsGrid posts={posts} />
        <Pagination />
      </div>
    </Layout>
  );
}
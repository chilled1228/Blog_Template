import { getBlogPostsByCategory } from '@/lib/blogService';
import { notFound } from 'next/navigation';
import React from 'react';
import { Layout } from '@/components/layout';
import BlogPostsGrid from '@/components/ui/BlogPostsGrid';
import StructuredData from '@/components/ui/StructuredData';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const { category } = await params;
  const posts = await getBlogPostsByCategory(category);

  if (posts.length === 0) {
    notFound();
  }

  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

  return (
    <Layout>
      <StructuredData slug={`${category}-page`} />
      <div className="blog-container">
        <div className="blog-content-wrapper">
          <div className="category-header">
            <h1 className="category-title">{formattedCategory}</h1>
            <p className="category-description">
              Explore our latest articles about {formattedCategory.toLowerCase()}
            </p>
          </div>
          <BlogPostsGrid posts={posts} />
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
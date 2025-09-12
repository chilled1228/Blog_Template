import { getBlogPostsByCategory } from '@/lib/blogService';
import { getCategoryBySlug } from '@/lib/firebase';
import React from 'react';
import { Layout } from '@/components/layout';
import BlogPostsGrid from '@/components/ui/BlogPostsGrid';
import Pagination from '@/components/ui/Pagination';
import CategoryStructuredData from '@/components/ui/CategoryStructuredData';
import CategoryBanner from '@/components/ui/CategoryBanner';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const { category } = await params;
  const posts = await getBlogPostsByCategory(category);
  const categoryData = await getCategoryBySlug(category);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

  // Use database category data if available, otherwise fallback
  const content = {
    title: categoryData?.name || category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' '),
    description: categoryData?.description || `Discover insightful articles and tutorials about ${categoryData?.name || category.toLowerCase()}.`,
    image: '/api/placeholder/1200/400'
  };

  return (
    <Layout>
      <CategoryStructuredData 
        category={content.title} 
        url={`${siteUrl}/category/${category}`}
        posts={posts}
      />
      
      <div className="min-h-screen">
        {/* Category Banner */}
        <CategoryBanner 
          title={content.title}
          description={content.description}
          image={content.image}
          postCount={posts.length}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          

          {/* Posts Grid Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#44403D]">
                All {content.title} Articles
              </h2>
              <div className="text-sm text-[#4B5D58] font-medium">
                {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
              </div>
            </div>
            
            {posts.length > 0 ? (
              <BlogPostsGrid posts={posts} />
            ) : (
              <div className="text-center py-12">
                <div className="text-[#4B5D58] text-lg mb-2">No articles found</div>
                <div className="text-[#4B5D58]/70">Check back soon for new content!</div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {posts.length > 0 && (
            <div className="mt-12">
              <Pagination />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
import { getBlogPostsByCategory } from '@/lib/blogService';
import React from 'react';
import { Layout } from '@/components/layout';
import HeroSlider from '@/components/ui/HeroSlider';
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
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

  // Category-specific content
  const categoryContent = {
    backend: {
      title: 'Backend Development',
      description: 'Explore comprehensive tutorials, best practices, and cutting-edge techniques in backend development. From server architecture to database optimization.',
      image: '/api/placeholder/1200/400'
    },
    frontend: {
      title: 'Frontend Development',
      description: 'Master modern frontend technologies, responsive design, and user experience principles. Create stunning, performant web applications.',
      image: '/api/placeholder/1200/400'
    },
    css: {
      title: 'CSS & Styling',
      description: 'Dive deep into CSS mastery, from fundamental concepts to advanced animations and modern layout techniques.',
      image: '/api/placeholder/1200/400'
    },
    technology: {
      title: 'Technology',
      description: 'Stay updated with the latest technology trends, programming languages, and development tools shaping the future.',
      image: '/api/placeholder/1200/400'
    },
    general: {
      title: 'General Programming',
      description: 'Broad programming concepts, career advice, and general development practices for developers of all levels.',
      image: '/api/placeholder/1200/400'
    }
  };

  const content = categoryContent[category as keyof typeof categoryContent] || {
    title: formattedCategory,
    description: `Discover insightful articles and tutorials about ${category.toLowerCase()}.`,
    image: '/api/placeholder/1200/400'
  };

  return (
    <Layout>
      <CategoryStructuredData 
        category={formattedCategory} 
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
          {/* Hero Slider for Featured Posts */}
          {posts.length > 0 && (
            <div className="mb-12">
              <HeroSlider posts={posts.slice(0, 5)} />
            </div>
          )}

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
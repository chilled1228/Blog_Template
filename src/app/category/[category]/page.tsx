import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate';
import { getBlogPostsByCategory } from '@/lib/blogService';
import { createMetadata } from '@/lib/seo';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const posts = await getBlogPostsByCategory(category);
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  
  const categoryContent = {
    backend: {
      title: 'Backend Development',
      description: 'Explore comprehensive tutorials, best practices, and cutting-edge techniques in backend development. From server architecture to database optimization.',
    },
    frontend: {
      title: 'Frontend Development',
      description: 'Master modern frontend technologies, responsive design, and user experience principles. Create stunning, performant web applications.',
    },
    css: {
      title: 'CSS & Styling',
      description: 'Dive deep into CSS mastery, from fundamental concepts to advanced animations and modern layout techniques.',
    },
    technology: {
      title: 'Technology',
      description: 'Stay updated with the latest technology trends, programming languages, and development tools shaping the future.',
    },
    general: {
      title: 'General Programming',
      description: 'Broad programming concepts, career advice, and general development practices for developers of all levels.',
    }
  };

  const content = categoryContent[category as keyof typeof categoryContent] || {
    title: formattedCategory,
    description: `Discover insightful articles and tutorials about ${category.toLowerCase()}.`,
  };

  return createMetadata({
    title: `${content.title} - ${posts.length} Articles`,
    description: `${content.description} Browse ${posts.length} articles in our ${content.title.toLowerCase()} category.`,
    path: `/category/${category}`,
    keywords: [category, content.title.toLowerCase(), 'blog', 'articles', 'tutorials'],
  });
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  return <CategoryPageTemplate params={params} />;
};

export default CategoryPage;
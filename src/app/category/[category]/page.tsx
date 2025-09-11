import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate';
import { getBlogPostsByCategory } from '@/lib/blogService';
import { getCategoryBySlug, getAllCategories } from '@/lib/firebase';
import { createMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  
  // Get category info from database
  const categoryData = await getCategoryBySlug(category);
  if (!categoryData) {
    return createMetadata({
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
      path: `/category/${category}`,
    });
  }

  const posts = await getBlogPostsByCategory(category);
  
  return createMetadata({
    title: `${categoryData.name} - ${posts.length} Articles`,
    description: categoryData.description || `Discover insightful articles and tutorials about ${categoryData.name.toLowerCase()}.`,
    path: `/category/${category}`,
    keywords: [category, categoryData.name.toLowerCase(), 'blog', 'articles', 'tutorials'],
  });
}

// Generate static paths for all categories
export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();
    return categories.map((category) => ({
      category: category.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for categories:', error);
    return [];
  }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const { category } = await params;
  
  // Validate category exists in database
  const categoryData = await getCategoryBySlug(category);
  if (!categoryData) {
    notFound();
  }

  return <CategoryPageTemplate params={params} />;
};

export default CategoryPage;
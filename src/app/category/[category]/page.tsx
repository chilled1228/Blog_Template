import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  return <CategoryPageTemplate params={params} />;
};

export default CategoryPage;
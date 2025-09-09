import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate';

const GeneralCategoryPage: React.FC = async () => {
  return <CategoryPageTemplate params={{ category: 'general' }} />;
};

export default GeneralCategoryPage;
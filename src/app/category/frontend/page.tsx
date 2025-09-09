import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate';

const FrontendPage: React.FC = async () => {
  return <CategoryPageTemplate params={{ category: 'frontend' }} />;
};

export default FrontendPage;
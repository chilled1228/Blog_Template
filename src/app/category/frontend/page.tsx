import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate';

const FrontendPage: React.FC = async () => {
  return <CategoryPageTemplate params={Promise.resolve({ category: 'frontend' })} />;
};

export default FrontendPage;
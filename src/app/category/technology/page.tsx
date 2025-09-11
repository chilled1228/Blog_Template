import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate';

const TechnologyPage: React.FC = async () => {
  return <CategoryPageTemplate params={Promise.resolve({ category: 'technology' })} />;
};

export default TechnologyPage;
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate';

const TechnologyPage: React.FC = async () => {
  return <CategoryPageTemplate params={{ category: 'technology' }} />;
};

export default TechnologyPage;
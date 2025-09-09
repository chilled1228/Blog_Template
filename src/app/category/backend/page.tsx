import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate';

const BackendPage: React.FC = async () => {
  return <CategoryPageTemplate params={{ category: 'backend' }} />;
};

export default BackendPage;
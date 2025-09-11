import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate';

const BackendPage: React.FC = async () => {
  return <CategoryPageTemplate params={Promise.resolve({ category: 'backend' })} />;
};

export default BackendPage;
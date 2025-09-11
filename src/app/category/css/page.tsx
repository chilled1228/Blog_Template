import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate';

const CssPage: React.FC = async () => {
  return <CategoryPageTemplate params={Promise.resolve({ category: 'css' })} />;
};

export default CssPage;
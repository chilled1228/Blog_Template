import { Layout } from '@/components/layout';
import React from 'react';
import HeroSlider from '@/components/ui/HeroSlider';
import BlogPostsGrid from '@/components/ui/BlogPostsGrid';
import Pagination from '@/components/ui/Pagination';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <HeroSlider />
      <BlogPostsGrid />
      <Pagination />
    </Layout>
  );
};

export default HomePage;
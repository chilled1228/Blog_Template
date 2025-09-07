import { Layout } from '@/components/layout';
import React from 'react';
import HeroSlider from '@/components/ui/HeroSlider';
import BlogPostsGrid from '@/components/ui/BlogPostsGrid';
import Pagination from '@/components/ui/Pagination';

const HomePage: React.FC = () => {
  return (
    <main className="main-content">
      <HeroSlider />
      <BlogPostsGrid />
      <Pagination />
    </main>
  );
};

export default HomePage;